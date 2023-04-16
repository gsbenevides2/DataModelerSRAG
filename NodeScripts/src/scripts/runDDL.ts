import type OracleDB from "oracledb";
import path from "path";
import runSQLScript from "../helpers/runSQLScript";

export async function runDDL(connection: OracleDB.Connection): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "Script1",
    "start.sql"
  );
  await runSQLScript(connection, sqlPath);
}
