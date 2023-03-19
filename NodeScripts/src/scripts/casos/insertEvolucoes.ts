import OracleDB from "oracledb";
import { parseDateStringToDateObject } from "../../helpers/parseDateStingToDate";

export async function insertEvolucoes(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const cevCasId = casId;
  if (!row.EVOLUCAO || row.EVOLUCAO === "") return;
  const cevEvoId = Number(row.EVOLUCAO);
  const cevDate = row.DT_EVOLUCA
    ? parseDateStringToDateObject(row.DT_EVOLUCA)
    : null;

  await connection.execute(
    `INSERT INTO CASOS_EVOLUCOES (CEV_CAS_ID, CEV_EVO_ID, CEV_DATE)
        VALUES (:cevCasId, :cevEvoId, :cevDate)`,
    {
      cevCasId: cevCasId,
      cevEvoId: cevEvoId,
      cevDate: cevDate,
    }
  );
}
