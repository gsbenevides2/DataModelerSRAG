import type OracleDB from "oracledb";
import path from "path";
import runSQLScript from "../../helpers/runSQLScript";

export async function createAuditTable(
  connection: OracleDB.Connection
): Promise<void> {
  const createUserScriptPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "createAuditTable.sql"
  );

  await runSQLScript(connection, createUserScriptPath);
}
