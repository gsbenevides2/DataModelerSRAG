import OracleDB from "oracledb";

export async function insertAmostras(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.AMOSTRA !== "1") return;

  const camData = row.DT_COLETA?.length > 0 ? row.DT_COLETA : null;
  const camTamId = row.TP_AMOSTRA?.length > 0 ? row.TP_AMOSTRA : null;

  await connection.execute(
    `INSERT INTO CASOS_AMOSTRAS (CAM_CAS_ID, CAM_DATA, CAM_TAM_ID)
            VALUES (:camCasId, :camData, :camTamId)`,
    {
      camCasId: casId,
      camData: camData,
      camTamId: camTamId,
    }
  );
}
