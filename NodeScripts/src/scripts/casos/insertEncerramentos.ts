import OracleDB from "oracledb";

export async function insertEncerramento(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.CRITERIO?.length > 0 || row.DT_ENCERRA?.length > 0) {
    const encCriId = row.CRITERIO ? Number(row.CRITERIO) : null;
    const encData = row.DT_ENCERRA ? row.DT_ENCERRA : null;

    await connection.execute(
      `INSERT INTO ENCERRAMENTOS (
                ENC_CAS_ID,
                ENC_CRI_ID,
                ENC_DATA
            ) VALUES (
                :casId,
                :criterio,
                :data
            )`,
      {
        casId: casId,
        criterio: encCriId,
        data: encData,
      }
    );
  }
}
