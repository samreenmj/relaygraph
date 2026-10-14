import Fastify from "fastify";
import { checkPostgres, pool } from "./db/postgres.js";
import { checkFalkorDB, getGraphClient } from "./db/graph.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.get("/health", async () => ({
    status: "ok",
    service: "relaygraph-api",
    timestamp: new Date().toISOString(),
  }));

  app.get("/health/ready", async (_request, reply) => {
    const checks: Record<string, string> = {};

    try {
      await checkPostgres();
      checks.postgres = "ok";
    } catch {
      checks.postgres = "error";
    }

    try {
      await checkFalkorDB();
      checks.falkordb = "ok";
    } catch {
      checks.falkordb = "error";
    }

    const ready = Object.values(checks).every(
      (status) => status === "ok",
    );

    return reply.code(ready ? 200 : 503).send({
      status: ready ? "ready" : "not_ready",
      checks,
    });
  });

  app.addHook("onClose", async () => {
    await pool.end();

    try {
      const graphClient = await getGraphClient();
      await graphClient.close();
    } catch {
      // The graph client may never have connected.
    }
  });

  return app;
}
