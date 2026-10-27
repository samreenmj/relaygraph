import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "./postgres.js";

const migrationPath = fileURLToPath(
  new URL("./migrations/001_initial.sql", import.meta.url),
);

try {
  const sql = await readFile(migrationPath, "utf8");
  await pool.query(sql);
  console.log("Migration 001 applied successfully.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
