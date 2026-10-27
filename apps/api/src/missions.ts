import { randomUUID } from "node:crypto";
import { pool } from "./db/postgres.js";
import { getGraphClient } from "./db/graph.js";

export type MissionStatus =
  | "created"
  | "investigating"
  | "ready_for_implementation"
  | "implementing"
  | "verifying"
  | "completed"
  | "failed";

interface MissionInput {
  title: string;
  description: string;
}

export async function createMission(input: MissionInput) {
  const id = randomUUID();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO missions (id, title, description, status)
       VALUES ($1, $2, $3, 'created')
       RETURNING id, title, description, status, created_at, updated_at`,
      [id, input.title, input.description],
    );

    await client.query("COMMIT");

    // FalkorDB is the graph-backed coordination and context layer.
    const falkor = await getGraphClient();
    const graph = falkor.selectGraph(
      process.env.FALKORDB_GRAPH ?? "relaygraph",
    );

    await graph.query(
      `CREATE (m:Mission {id: $id, title: $title, status: 'created'})`,
      { params: { id, title: input.title } },
    );

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function getMission(id: string) {
  const result = await pool.query(
    `SELECT id, title, description, status, created_at, updated_at
     FROM missions WHERE id = $1`,
    [id],
  );

  return result.rows[0] ?? null;
}
