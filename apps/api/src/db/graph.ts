import "dotenv/config";
import { FalkorDB } from "falkordb";

let client: FalkorDB | undefined;

export async function getGraphClient() {
  if (!client) {
    client = await FalkorDB.connect({
      host: process.env.FALKORDB_HOST ?? "127.0.0.1",
      port: Number(process.env.FALKORDB_PORT ?? 6379),
    });
  }

  return client;
}

export async function checkFalkorDB() {
  const db = await getGraphClient();
  const graph = db.selectGraph(
    process.env.FALKORDB_GRAPH ?? "relaygraph",
  );

  const result = await graph.query("RETURN 1 AS ok");
  return result.data;
}
