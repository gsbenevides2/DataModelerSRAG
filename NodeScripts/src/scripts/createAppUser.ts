import type OracleDB from "oracledb";
import path from "path";
import runSQLScript from "../helpers/runSQLScript";
import { connectToDatabase } from "../helpers/connectToDatabase";

export async function createAppUser(
  connection: OracleDB.Connection,
  connectionString: string
): Promise<OracleDB.Connection> {
  const createUserScriptPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "createUser.sql"
  );

  await runSQLScript(connection, createUserScriptPath);

  return await connectToDatabase("APP", "APP123", connectionString);
}
