import oracleDb from "oracledb";
import { OracleError } from "./OracleError";

oracleDb.outFormat = oracleDb.OUT_FORMAT_OBJECT;

/**
 * Connects to the Oracle Database using the connection string and credentials
 */
export async function connectToDatabase(
  user: string,
  password: string,
  connectString: string
): Promise<oracleDb.Connection> {
  try {
    console.log("Connecting to Oracle Database");
    console.log(
      "Connection string: " +
        connectString +
        " User: " +
        user +
        " Password: " +
        password
    );
    const connection = await oracleDb.getConnection({
      user,
      password,
      connectString,
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!connection) throw new Error("Connection is null");
    console.log("Connected to Oracle Database");

    await connection.execute(
      "ALTER SESSION SET NLS_DATE_FORMAT = 'DD/MM/YYYY'"
    );
    return connection;
  } catch (err) {
    throw new OracleError("connectToDatabase", err, {});
  }
}
