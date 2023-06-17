import type OracleDB from "oracledb";
import path from "path";
import runSQLScript from "../../helpers/runSQLScript";
import { connectToDatabase } from "../../helpers/connectToDatabase";

export async function createAuditUser(
  connection: OracleDB.Connection,
  connectionString: string
): Promise<OracleDB.Connection> {
  const createUserScriptPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "createAuditUser.sql"
  );

  await runSQLScript(connection, createUserScriptPath);

  return await connectToDatabase("AUDITORIA", "AUDITORIA123", connectionString);
}
