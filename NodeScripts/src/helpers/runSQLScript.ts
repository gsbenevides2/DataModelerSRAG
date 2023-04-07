import fs from "fs";
import OracleDB from "oracledb";
import path from "path";

export default async function runSQLScript(
  connection: OracleDB.Connection,
  filePath: string
  //callback: (err: Error | null, result?: any) => void
) {
  console.log("runSQLScript", filePath);
  const file = fs.readFileSync(filePath, "utf8");
  const statements: string[] = [];
  let statement = "";
  let inComment = false;
  let beginBlock = false;
  let openedQuotes: string[] = [];
  for (let i = 0; i < file.length; i++) {
    const character = file[i];
    if (character === "'" || character === '"') {
      if (openedQuotes.length === 0) openedQuotes.push(character);
      else if (openedQuotes[openedQuotes.length - 1] === character)
        openedQuotes.pop();
      else openedQuotes.push(character);
    }
    if (character === "-" && statement.length === 0) {
      inComment = true;
    }
    if (character === "\n" && inComment) {
      inComment = false;
    }
    if (inComment) continue;
    if (
      statement.length >= 5 &&
      statement.slice(-5).toUpperCase() === "BEGIN"
    ) {
      beginBlock = true;
    }
    if (beginBlock) {
      if (character === "/") {
        beginBlock = false;
        statements.push(statement);
        statement = "";
        continue;
      }
      statement += character;

      continue;
    }

    if (
      (character === "\n" || i === file.length - 1) &&
      statement.length &&
      statement[0] === "@" &&
      statement[1] === "@"
    ) {
      if (file.length - 1 === i) statement += character;
      const newPart = statement.slice(2).trim();
      const newPath = path.join(path.dirname(filePath), newPart);
      await runSQLScript(connection, newPath);
      statement = "";
    }
    if (
      (character === "\n" || i === file.length - 1) &&
      statement.length &&
      statement[0] === "@"
    ) {
      if (file.length - 1 === i) statement += character;
      const newPart = statement.slice(1).trim();
      const newPath = path.join(path.dirname(filePath), newPart);
      await runSQLScript(connection, newPath);
      statement = "";
    }
    if (character === ";") {
      if (beginBlock) continue;
      if (openedQuotes.length === 0) {
        statements.push(statement);
        statement = "";
      } else {
        statement += character;
      }
      continue;
    }
    if (character === "\n" && statement.length > 0) {
      statement += "\n";
      continue;
    }
    if (character === "\n" && statement.length === 0) continue;
    if (character !== ";") {
      statement += character;
    }
  }

  //console.log(statements);
  for (const statement of statements) {
    try {
      if (statement.toUpperCase() === "COMMIT") await connection.commit();
      else await connection.execute(statement);
    } catch (err) {
      console.log(statement);
      throw err;
    }
  }
}
/*
const testFile = path.resolve(
  process.cwd(),
  "..",
  "ScriptsSQL",
  "Script1",
  "tables",
  "casos.sql"
);
runSQLScript(testFile);
*/
