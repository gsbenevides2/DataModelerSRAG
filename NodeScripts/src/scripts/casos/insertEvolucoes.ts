import OracleDB from "oracledb";
import { OracleError } from "../../helpers/OracleError";
import { validateDateFormat } from "../../helpers/validateDateFormat";

export async function insertEvolucoes(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const cevCasId = casId;
  if (!row.EVOLUCAO || row.EVOLUCAO === "") return;
  const cevEvoId = Number(row.EVOLUCAO);
  const cevDate = validateDateFormat(row.DT_EVOLUCA);

  const params = {
    cevCasId: cevCasId,
    cevEvoId: cevEvoId,
    cevDate: cevDate,
  };
  try {
    await connection.execute(
      `INSERT INTO CASOS_EVOLUCOES (CEV_CAS_ID, CEV_EVO_ID, CEV_DATE)
        VALUES (:cevCasId, :cevEvoId, :cevDate)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertEvolucoes", e, params);
  }
}
