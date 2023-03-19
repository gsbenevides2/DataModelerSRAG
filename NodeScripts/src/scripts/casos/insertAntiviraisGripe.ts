import OracleDB from "oracledb";

export async function insertAntiviraisGripe(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.ANTIVIRAL !== "1") return;

  const cagAngId = row.TP_ANTIVIR.length > 0 ? row.TP_ANTIVIR : null;
  const cagData = row.DT_ANTIVIR.length > 0 ? row.DT_ANTIVIR : null;

  await connection.execute(
    `INSERT INTO CASOS_ANTIVIRAIS_GRIPE (CAG_ANG_ID, CAG_CAS_ID, CAG_DATA) 
    VALUES (:cagAngId, :casId, :cagData)`,
    {
      cagAngId: cagAngId,
      casId: casId,
      cagData: cagData,
    }
  );
}
