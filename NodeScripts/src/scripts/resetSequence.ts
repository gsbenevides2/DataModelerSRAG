import readlineSync from "readline-sync";
import { connectToDatabase } from "../helpers/connectToDatabase";

const resetSequence = async () => {
  const sequenceName = readlineSync.question("Sequence name: ");
  const sequenceStart = readlineSync.question("Sequence start: ");

  const connection = await connectToDatabase();

  console.log("Resetting sequence...");

  await connection.execute(`DROP SEQUENCE ${sequenceName}`);

  let sequenceString = `CREATE SEQUENCE ${sequenceName}`;

  if (sequenceStart.length > 0) {
    sequenceString += ` START WITH ${sequenceStart}`;
  }

  sequenceString += ` NOCACHE`;

  await connection.execute(sequenceString);
  await connection.commit();
  await connection.close();
  console.log("Done resetting sequence.");
};

resetSequence();
