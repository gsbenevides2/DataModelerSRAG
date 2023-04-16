import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertUti(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.UTI !== "1") return;

  const utiDataEntrada = validateDateFormat(row.DT_ENTUTI);
  const utiDataSaida = validateDateFormat(row.DT_SAIDUTI);

  const params = {
    casId,
    utiDataEntrada,
    utiDataSaida,
  };

  try {
    await connection.execute(
      `INSERT INTO UTI (UTI_CAS_ID, UTI_DATA_ENTRADA, UTI_DATA_SAIDA)
        VALUES (:casId, :utiDataEntrada, :utiDataSaida)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertUti", e, params);
  }
}
