import type OracleDB from "oracledb";
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
import { type SuportedYears, type Columns } from "../types";
import { insertAntiviraisCovid } from "./insertAntiviraisCovid";

const dataPath = path.resolve(process.cwd(), "data");

export async function insertLine(
  row: Columns,
  connection: OracleDB.Connection,
  year: SuportedYears
): Promise<void> {
  if (row.SG_UF !== "SP") return;
  await insertMunicipios(row, connection);
  await insertUnidade(row, connection);

  const casId = await insertCaso(connection, row);

  const promises = [
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
  ];
  const notSuportedYearsForVacinas: SuportedYears[] = ["2020"];
  const notSuportedYearsForAntiviraisCovid: SuportedYears[] = ["2020", "2021"];

  if (!notSuportedYearsForVacinas.includes(year))
    promises.push(insertVacinas(connection, row, casId));

  if (!notSuportedYearsForAntiviraisCovid.includes(year))
    promises.push(insertAntiviraisCovid(connection, row, casId));

  await Promise.all(promises);
  await connection.commit();
}

export async function handleError(
  error: any,
  connection: OracleDB.Connection,
  row: Columns,
  lineIndex: number,
  pureRow: string,
  year: SuportedYears
): Promise<void> {
  await connection.rollback();
  const errorFolderPath = path.resolve(dataPath, `errors-${year}`);
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
    row,
    lineIndex,
    pureRow,
  };

  fs.writeFileSync(errorLog, JSON.stringify(errorToFile, null, 2));
}
