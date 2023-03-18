import oracleDb from "oracledb";
import "dotenv/config";

oracleDb.outFormat = oracleDb.OUT_FORMAT_OBJECT;

/**
 * Connects to the Oracle Database using the connection string and credentials provided in the .env file
 */
export async function connectToDatabase(): Promise<oracleDb.Connection> {
  try {
    console.log("Connecting to Oracle Database");
    console.log(
      "Connection string: " +
        process.env.DB_CONNECTION_STRING +
        " User: " +
        process.env.DB_USER +
        " Password: " +
        process.env.DB_PASSWORD
    );
    const connection = await oracleDb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });
    if (!connection) throw new Error("Connection is null");
    console.log("Connected to Oracle Database");
    return connection;
  } catch (err) {
    console.error("Error connecting to Oracle Database");
    console.error(err);
    process.exit(1);
  }
}
