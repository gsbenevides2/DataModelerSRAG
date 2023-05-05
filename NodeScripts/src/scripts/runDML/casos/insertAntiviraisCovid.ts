import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertAntiviraisCovid(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.TRAT_COV !== "1") return;

  const cacAncId =
    row.TIPO_TRAT != null && row.TIPO_TRAT.length > 0 ? row.TIPO_TRAT : null;
  const cacDataInicio =
    row.DT_TRT_COV != null ? validateDateFormat(row.DT_TRT_COV) : null;

  const params = {
    cacAncId,
    casId,
    cacDataInicio,
  };
  try {
    await connection.execute(
      `INSERT INTO CASOS_ANTIVIRAIS_COVID (CAC_ANC_ID, CAC_CAS_ID, CAC_DATA_INICIO) 
    VALUES (:cacAncId, :casId, :cagDataInicio)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertAntiviraisCovid", e, params);
  }
}
