import type OracleDB from "oracledb";
import runSQLScript from "../helpers/runSQLScript";
import path from "path";

export async function moveDataToHistory(
  connection: OracleDB.Connection
): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "moveToHistory.sql"
  );
  await runSQLScript(connection, sqlPath);
}
