import { connectToDatabase } from "../helpers/connectToDatabase";

export const testConnection = async () => {
  const connection = await connectToDatabase();
  console.log("Connection successful!");
  connection.close();
};

testConnection();
