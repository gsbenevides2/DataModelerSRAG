import OracleDB from "oracledb";
import path from "path";
import { connectToDatabase } from "../helpers/connectToDatabase";
import { readCSVFile } from "../helpers/readCSVFile";

type DataSetColumns = {
  TEXT: string;
};

const runAuto = false;

const csvFilePath = path.resolve(process.cwd(), "data", "NEW.csv");

const defaultComorbidades = [
  "Puérpera",
  "Síndrome de Down",
  "Diabetes melitus",
  "Imunodeficiência/Imunodepressão",
  "Doença Cardiovascular Crônica",
  "Doença Hepática Crônica",
  "Doença Neurológica Crônica",
  "Doença Renal Crônica",
  "Doença Hematológica Crônica",
  "Asma",
  "Outra Pneumopatia Crônica",
  "Obesidade",
];

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
  " ",
];

const comorbidadeUnionChar = ";";

async function splitComorbidadeTextUsignPattern(text: string, divider: string) {
  const comorbidades = text.split(divider);
  return comorbidades.map((comorbidade) => comorbidade.trim());
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

const createComorbidadesMapAuto = async () => {
  const connection = await connectToDatabase();
  let count = 0;
  await readCSVFile<DataSetColumns>(
    csvFilePath,
    async (row) => {
      count++;
      console.log("Count: ", count);
      const { TEXT } = row;
      let ok = false;
      if (!TEXT) return;

      await autoVerifyComorbidade(connection, TEXT);
    },
    {
      delimiter: "¬",
    }
  );
};

//litsComorbidades();
createComorbidadesMapAuto();
