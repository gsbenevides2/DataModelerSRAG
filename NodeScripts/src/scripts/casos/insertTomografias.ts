import type OracleDB from "oracledb";
import { OracleError } from "../../helpers/OracleError";
import { validateDateFormat } from "../../helpers/validateDateFormat";
import { type Columns } from "./types";

export async function insertTomografias(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const ctoCasId = casId;
  if (row.TOMO_RES === null) return;
  if (row.TOMO_RES === undefined) return;
  if (row.TOMO_RES === "") return;
  const ctoAstId = Number(row.TOMO_RES);
  const ctoDate = validateDateFormat(row.DT_TOMO);

  const params = {
    ctoCasId,
    ctoAstId,
    ctoDate,
  };

  try {
    await connection.execute(
      `INSERT INTO CASOS_TOMOGRAFIA (CTO_CAS_ID, CTO_AST_ID, CTO_DATE)
    VALUES (:ctoCasId, :ctoAstId, :ctoDate)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertTomografias", e, params);
  }
}
