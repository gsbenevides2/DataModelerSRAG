import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertAmostras(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.AMOSTRA !== "1") return;

  const camData = validateDateFormat(row.DT_COLETA);
  const camTamId = row.TP_AMOSTRA?.length > 0 ? row.TP_AMOSTRA : null;

  const params = {
    camCasId: casId,
    camData,
    camTamId,
  };

  try {
    await connection.execute(
      `INSERT INTO CASOS_AMOSTRAS (CAM_CAS_ID, CAM_DATA, CAM_TAM_ID)
            VALUES (:camCasId, :camData, :camTamId)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertAmostras", e, params);
  }
}
