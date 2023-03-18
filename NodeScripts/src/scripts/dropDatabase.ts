import { connectToDatabase } from "../helpers/connectToDatabase";
import cliProgress from "cli-progress";

const dropDatabase = async () => {
  const connection = await connectToDatabase();
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  console.log("Getting all tables from the database");
  type UserTables = {
    TABLE_NAME: string;
  };
  const userTables = await connection.execute<UserTables>(
    `SELECT table_name FROM user_tables`
  );

  if (userTables.rows == null || userTables.rows.length === 0) {
    console.log("No tables found in the database");
  } else {
    console.log("Dropping all tables from the database");

    progressBar.start(userTables.rows.length, 0);
    for (const table of userTables.rows) {
      progressBar.increment();
      await connection.execute(
        `DROP TABLE ${table.TABLE_NAME} CASCADE CONSTRAINTS`
      );
    }
    progressBar.stop();
  }

  console.log("Getting all sequences from the database");
  type UserSequences = {
    SEQUENCE_NAME: string;
  };
  const userSequences = await connection.execute<UserSequences>(
    `SELECT sequence_name FROM user_sequences`
  );

  if (userSequences.rows == null || userSequences.rows.length === 0) {
    console.log("No sequences found in the database");
  } else {
    console.log("Dropping all sequences from the database");
    progressBar.start(userSequences.rows.length, 0);

    for (const sequence of userSequences.rows) {
      progressBar.increment();
      await connection.execute(`DROP SEQUENCE ${sequence.SEQUENCE_NAME}`);
    }
    progressBar.stop();
  }

  connection.close();

  console.log("Dropped all tables and sequences from the database");
};

dropDatabase();
