import path from "path";
import runSQLScript from "../../helpers/runSQLScript";
import type OracleDB from "oracledb";

export async function runTriggers(
  connection: OracleDB.Connection
): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "Script3",
    "start.sql"
  );
  await runSQLScript(connection, sqlPath);
}
