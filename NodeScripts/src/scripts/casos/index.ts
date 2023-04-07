import OracleDB from "oracledb";
import path from "path";

import { insertAmostras } from "./insertAmostras";
import { insertAntiviraisGripe } from "./insertAntiviraisGripe";
import { insertCaso } from "./insertCaso";
import { insertComorbidades } from "./insertComorbidades";
import { insertEncerramento } from "./insertEncerramentos";
import { insertEvolucoes } from "./insertEvolucoes";
import { insertInternacoes } from "./insertInternacoes";
import { insertRaioX } from "./insertRaioX";
import { insertSintomas } from "./insertSintomas";
import { insertTesteAntigeno } from "./insertTesteAntigeno";
import { insertTesteRtpcr } from "./insertTesteRtpcr";
import { insertTesteSorologico } from "./insertTesteSorologico";
import { insertTomografias } from "./insertTomografias";
import { insertUti } from "./insertUti";
import { insertVacinaGripe } from "./insertVacinaGripe";
import { insertVacinas } from "./insertVacinas";
import fs from "fs";
import { insertMunicipios } from "../insertMunicipios";
import { insertUnidade } from "../insertUnidade";

const dataPath = path.resolve(process.cwd(), "data");
const errorFolderPath = path.resolve(dataPath, "errors");

export async function insertLine(
  row: Columns,
  connection: OracleDB.Connection
) {
  if (row.SG_UF !== "SP") return;
  await insertMunicipios(row, connection);
  await insertUnidade(row, connection);

  const casId = await insertCaso(connection, row);

  await Promise.all([
    insertRaioX(connection, row, casId),
    insertEvolucoes(connection, row, casId),
    insertTomografias(connection, row, casId),
    insertVacinaGripe(connection, row, casId),
    insertEncerramento(connection, row, casId),
    insertAntiviraisGripe(connection, row, casId),
    insertUti(connection, row, casId),
    insertComorbidades(connection, row, casId),
    insertSintomas(connection, row, casId),
    insertAmostras(connection, row, casId),
    insertInternacoes(connection, row, casId),
    insertTesteAntigeno(connection, row, casId),
    insertTesteRtpcr(connection, row, casId),
    insertTesteSorologico(connection, row, casId),
    insertVacinas(connection, row, casId),
  ]);

  await connection.commit();
}

export async function handleError(
  error: any,
  connection: OracleDB.Connection,
  row: Columns,
  lineIndex: number,
  pureRow: string
) {
  await connection.rollback();

  if (!fs.existsSync(errorFolderPath)) fs.mkdirSync(errorFolderPath);

  const errorsCsv = path.resolve(errorFolderPath, "errors.csv");
  const errorLog = path.resolve(errorFolderPath, `error-${lineIndex}.txt`);
  fs.appendFileSync(errorsCsv, `${pureRow}\n`);

  const errorObject = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause,
  };

  Object.keys(error).forEach((key) => {
    if (
      key !== "name" &&
      key !== "message" &&
      key !== "stack" &&
      key !== "cause"
    ) {
      const key2 = key as keyof typeof error;
      const key3 = key2 as keyof typeof errorObject;
      errorObject[key3] = error[key2];
    }
  });

  const errorToFile = {
    error: errorObject,
    row: row,
    lineIndex: lineIndex,
    pureRow: pureRow,
  };

  fs.writeFileSync(errorLog, JSON.stringify(errorToFile, null, 2));
}
/*
async function handleError(
  error: any,
  connection: OracleDB.Connection,
  row: Columns,
  lineIndex: number,
  pureRow: string
) {
  await connection.rollback();

  if (!fs.existsSync(errorFolderPath)) fs.mkdirSync(errorFolderPath);

  const errorsCsv = path.resolve(errorFolderPath, "errors.csv");
  const errorLog = path.resolve(errorFolderPath, `error-${lineIndex}.txt`);
  fs.appendFileSync(errorsCsv, `${pureRow}\n`);

  const errorObject = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause,
  };

  Object.keys(error).forEach((key) => {
    if (
      key !== "name" &&
      key !== "message" &&
      key !== "stack" &&
      key !== "cause"
    ) {
      const key2 = key as keyof typeof error;
      const key3 = key2 as keyof typeof errorObject;
      errorObject[key3] = error[key2];
    }
  });

  const errorToFile = {
    error: errorObject,
    row: row,
    lineIndex: lineIndex,
    pureRow: pureRow,
  };

  fs.writeFileSync(errorLog, JSON.stringify(errorToFile, null, 2));
}

async function main() {

  await defineDateToThisSession(connection);

  const bar = new cliProgress.SingleBar(
    {
      format: "Progresso [{bar}] {percentage}% | {value}/{total}",
    },
    cliProgress.Presets.shades_classic
  );

  let allLinesCounted = false;
  let errorsCounted = 0;
  let lineOkCounted = 0;

  await readCSVFile<Columns>(
    fileCsvPath,
    async (row, index, length, pureRow) => {
      if (!allLinesCounted) {
        bar.start(length, 1);
        allLinesCounted = true;
      } else {
        bar.update(index);
      }
      try {
        await readLineData(row, connection);
        lineOkCounted++;
      } catch (e: any) {
        errorsCounted++;
        await handleError(e, connection, row, index, pureRow);
      }
    },
    {
      delimiter: ";",
      encoding: "utf8",
    }
  );

  bar.stop();

  await connection.close();

  console.log("Linhas com erro: ", errorsCounted);
  console.log("Linhas ok: ", lineOkCounted);
}

main();
*/
