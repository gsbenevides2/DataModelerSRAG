import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { type Columns } from "../types";

type RowsToInsert = Array<{
  csiCasId: number;
  csiSinId: number;
}>;

type ColumnsKeys = Array<keyof Columns>;

export async function insertSintomas(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const rowsToInsert: RowsToInsert = [];

  const keys: ColumnsKeys = [
    "FEBRE",
    "TOSSE",
    "GARGANTA",
    "DISPNEIA",
    "DESC_RESP",
    "SATURACAO",
    "DIARREIA",
    "VOMITO",
    "DOR_ABD",
    "FADIGA",
    "PERD_OLFT",
    "PERD_PALA",
    "OUTRO_SIN",
  ];

  for (let i = 0; i < keys.length; i++) {
    if (row[keys[i]] === "1") {
      rowsToInsert.push({
        csiCasId: casId,
        csiSinId: i + 1,
      });
    }
  }

  if (rowsToInsert.length === 0) return;

  try {
    await connection.executeMany(
      `INSERT INTO CASOS_SINTOMAS (CSI_CAS_ID, CSI_SIN_ID)
        VALUES (:csiCasId, :csiSinId)`,
      rowsToInsert
    );
  } catch (e: any) {
    throw new OracleError("insertSintomas", e, rowsToInsert);
  }
}
