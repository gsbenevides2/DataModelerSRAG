import type OracleDB from "oracledb";
import path from "path";
import runSQLScript from "../../helpers/runSQLScript";

export async function insertMetadata(
  connection: OracleDB.Connection
): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "Script2",
    "start.sql"
  );
  await runSQLScript(connection, sqlPath);
}
