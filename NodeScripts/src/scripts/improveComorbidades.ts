import inquirer from "inquirer";
import OracleDB from "oracledb";
import path from "path";
import { connectToDatabase } from "../helpers/connectToDatabase";
import { readCSVFile } from "../helpers/readCSVFile";
import inquirerPrompt from "inquirer-autocomplete-prompt";

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const commonDividers = [
  " E ",
  " / ",
  "/",
  "/ ",
  " /",
  ",",
  ", ",
  " ,",
  " , ",
  ";",
  "; ",
  " ;",
  " ; ",
  "+",
  "+ ",
  " +",
  " + ",
];

const comorbidadeUnionChar = ";";

async function createTableIfNotExistsOracle(
  connection: OracleDB.Connection,
  tableSchema: string
) {
  try {
    await connection.execute(tableSchema);
    await connection.commit();
  } catch (e: any) {
    if (e.errorNum !== 955) {
      console.log(e);
      process.exit(1);
    }
  }
}

async function createTempComorbidadesTable(connection: OracleDB.Connection) {
  const tableSchema = `
    CREATE TABLE temp_comorbidades(
        id INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    )
    `;
  await createTableIfNotExistsOracle(connection, tableSchema);
}

async function createTempComorbidadesMap(connection: OracleDB.Connection) {
  const tableSchema = `
    CREATE TABLE temp_comorbidades_map(
        text VARCHAR(255) NOT NULL PRIMARY KEY,
        corms_id VARCHAR(255)
    )
    `;
  await createTableIfNotExistsOracle(connection, tableSchema);
}

async function insertCsvLine(connection: OracleDB.Connection, line: string) {
  await connection.execute(
    `INSERT INTO temp_comorbidades_map(text) VALUES(:text)`,
    {
      text: line,
    }
  );
  await connection.commit();
}

async function verifyCsvLineExists(
  connection: OracleDB.Connection,
  line: string
) {
  const result = await connection.execute(
    `SELECT * FROM temp_comorbidades_map WHERE text = :text`,
    {
      text: line,
    }
  );

  return (result.rows?.length || 0) > 0;
}

async function insertLinesOfCsvToDB(connection: OracleDB.Connection) {
  const csvFilePath = path.resolve(
    process.cwd(),
    "data",
    "Dataset Filtrado - 2021.csv"
  );

  type DataSetColumns = {
    MORB_DESC: string;
  };

  await readCSVFile<DataSetColumns>(csvFilePath, async (row) => {
    const { MORB_DESC } = row;
    if (!MORB_DESC) return;

    const exists = await verifyCsvLineExists(connection, MORB_DESC);
    if (exists) return;

    await insertCsvLine(connection, MORB_DESC);
  });
}

async function searchAnyComorbidade(connection: OracleDB.Connection) {
  type DbResult = {
    TEXT: string;
  };
  const result = await connection.execute<DbResult>(
    `SELECT text FROM temp_comorbidades_map WHERE corms_id IS NULL AND rownum = 1`
  );

  return result.rows?.[0].TEXT;
}

async function findComorbidadeMaped(
  connection: OracleDB.Connection,
  text: string
) {
  type DbResult = {
    CORMS_ID: string;
  };
  const result = await connection.execute<DbResult>(
    `SELECT corms_id FROM temp_comorbidades_map WHERE text = :text`,
    {
      text,
    }
  );

  return result.rows?.[0]?.CORMS_ID;
}

async function splitComorbidadeTextUsignPattern(text: string, divider: string) {
  const comorbidades = text.split(divider);
  return comorbidades.map((comorbidade) => comorbidade.trim());
}

async function splitComorbidadeTextUsignPosition(
  text: string,
  pos: number
): Promise<string[]> {
  const comorbidades = [text.slice(0, pos), text.slice(pos)];
  return comorbidades.map((comorbidade) => comorbidade.trim());
}

async function insertComorbidadeMaped(
  connection: OracleDB.Connection,
  text: string,
  corms_id: string
) {
  await connection.execute(
    `UPDATE temp_comorbidades_map SET corms_id = :corms_id WHERE text = :text`,
    {
      corms_id,
      text,
    }
  );
  await connection.commit();
}

async function autoVerifyComorbidade(
  connection: OracleDB.Connection,
  text: string
) {
  for (const divider of commonDividers) {
    const comorbidades = await splitComorbidadeTextUsignPattern(text, divider);
    const comorbidadesMaped: (string | undefined)[] = [];
    for (const comorbidade of comorbidades) {
      const comorbidadeMaped = await findComorbidadeMaped(
        connection,
        comorbidade
      );
      comorbidadesMaped.push(comorbidadeMaped);
    }

    if (comorbidadesMaped.every((comorbidade) => comorbidade)) {
      const corms_id = comorbidadesMaped.join(comorbidadeUnionChar);
      await insertComorbidadeMaped(connection, text, corms_id);
      return true;
    }
  }
  return false;
}

async function createComorbidade(
  connection: OracleDB.Connection
): Promise<number> {
  try {
    const { newComorbidade } = await inquirer.prompt([
      {
        type: "input",
        name: "newComorbidade",
        message: "Qual a nova comorbidade?",
      },
    ]);

    const result = await connection.execute<{ ID: number }>(
      `SELECT count(*) as ID FROM temp_comorbidades`,
      []
    );
    if (!result.rows?.length) {
      console.log("Erro ao criar comorbidade");
      process.exit(1);
    }
    const lastId = result.rows[0].ID + 1;
    await connection.execute(
      `INSERT INTO temp_comorbidades(id, name) VALUES(:id, :name)`,
      {
        id: lastId,
        name: newComorbidade,
      }
    );
    await connection.commit();
    return lastId;
  } catch (e: any) {
    console.log(e);
    process.exit(1);
  }
}

async function askComorbidade(
  connection: OracleDB.Connection,
  text: string
): Promise<string> {
  const result = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "comorbidade",
      message: `Qual a comorbidade ${text}?`,
      source: async (answersSoFar: string, input: string) => {
        const result = await connection.execute<{ NAME: string }>(
          `
          SELECT name FROM temp_comorbidades WHERE name LIKE :name
        `,
          {
            name: `%${input}%`,
          }
        );
        if (!result.rows) return ["Cadastrar nova comorbidade", "Ignorar"];
        const corms = result.rows.map((row) => row.NAME);
        corms.push("Cadastrar nova comorbidade", "Ignorar");
        return corms;
      },
    },
  ]);

  const { comorbidade } = result;

  if (comorbidade === "Ignorar") return "0";

  if (comorbidade === "Cadastrar nova comorbidade") {
    const cormCod = await createComorbidade(connection);

    return cormCod.toString();
  }

  const result2 = await connection.execute<{ ID: number }>(
    `SELECT id FROM temp_comorbidades WHERE name = :name`,
    {
      name: comorbidade,
    }
  );

  if (!result2.rows?.length) {
    console.log("Comorbidade não encontrada");
    process.exit(1);
  }

  return result2.rows[0].ID.toString();
}
async function tryManualInsertingComorbidade(
  connection: OracleDB.Connection,
  text: string
): Promise<string> {
  const { questHasDivider } = await inquirer.prompt({
    type: "confirm",
    name: "questHasDivider",
    message: `A comorbidade "${text}" possui algum divisor?`,
  });

  if (questHasDivider) {
    const { typeOfDivider } = await inquirer.prompt({
      type: "list",
      name: "typeOfDivider",
      message: `Qual o divisor da comorbidade "${text}"?`,
      choices: ["Textual", "Posicional"],
    });
    if (typeOfDivider === "Textual") {
      const { divider } = await inquirer.prompt({
        type: "input",
        name: "divider",
        message: `Qual o divisor da comorbidade "${text}"?`,
      });
      const comorbidades = await splitComorbidadeTextUsignPattern(
        text,
        divider
      );

      const comorbidadesMaped: string[] = [];

      for (const comorbidade of comorbidades) {
        const comorbidadeMaped = await findComorbidadeMaped(
          connection,
          comorbidade
        );

        if (comorbidadeMaped == null) {
          comorbidadesMaped.push(
            await tryManualInsertingComorbidade(connection, comorbidade)
          );
        } else comorbidadesMaped.push(comorbidadeMaped);
      }

      const corms_id = comorbidadesMaped.join(comorbidadeUnionChar);
      await insertComorbidadeMaped(connection, text, corms_id);
      return corms_id;
    } else {
      const { position } = await inquirer.prompt({
        type: "number",
        name: "position",
        message: `Qual a posição da comorbidade a ser dividida "${text}"?`,
      });
      const comorbidades = await splitComorbidadeTextUsignPosition(
        text,
        Number(position)
      );

      const comorbidadesMaped: string[] = [];

      for (const comorbidade of comorbidades) {
        const comorbidadeMaped = await findComorbidadeMaped(
          connection,
          comorbidade
        );
        if (comorbidadeMaped == null) {
          comorbidadesMaped.push(
            await tryManualInsertingComorbidade(connection, comorbidade)
          );
        } else comorbidadesMaped.push(comorbidadeMaped);
      }

      const corms_id = comorbidadesMaped.join(comorbidadeUnionChar);
      await insertComorbidadeMaped(connection, text, corms_id);
      return corms_id;
    }
  } else {
    const cormCod = await askComorbidade(connection, text);
    await insertComorbidadeMaped(connection, text, cormCod);
    return cormCod;
  }
}

async function main() {
  const connection = await connectToDatabase();

  console.log(
    "> Criando Tabelas Temporárias! (temp_comorbidades_map, temp_comorbidades)"
  );
  await createTempComorbidadesMap(connection);
  await createTempComorbidadesTable(connection);

  console.log("> Inserindo Linhas do CSV no Banco de Dados!");
  await insertLinesOfCsvToDB(connection);

  while (true) {
    const comorbidade = await searchAnyComorbidade(connection);
    console.log("> Comorbidade sendo Processada!");
    if (!comorbidade) break;
    if (!(await autoVerifyComorbidade(connection, comorbidade))) {
      await tryManualInsertingComorbidade(connection, comorbidade);
    }
    console.clear();
  }
}

main();
