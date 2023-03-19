import OracleDB from "oracledb";

export async function insertUti(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.UTI !== "1") return;

  const utiDataEntrada = row.DT_ENTUTI.length > 0 ? row.DT_ENTUTI : null;
  const utiDataSaida = row.DT_SAIDUTI.length > 0 ? row.DT_SAIDUTI : null;

  await connection.execute(
    `INSERT INTO UTI (UTI_CAS_ID, UTI_DATA_ENTRADA, UTI_DATA_SAIDA)
        VALUES (:casId, :utiDataEntrada, :utiDataSaida)`,
    {
      casId: casId,
      utiDataEntrada: utiDataEntrada,
      utiDataSaida: utiDataSaida,
    }
  );
}
