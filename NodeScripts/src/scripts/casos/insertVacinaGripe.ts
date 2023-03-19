import OracleDB from "oracledb";

export async function insertVacinaGripe(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.VACINA === null) return;
  if (row.VACINA === undefined) return;
  if (row.VACINA === "") return;
  if (row.VACINA !== "1") return;

  const vagCasId = casId;

  let vagData = null;
  if (row.DT_UT_DOSE?.length > 0) {
    vagData = row.DT_UT_DOSE;
  }

  await connection.execute(
    `INSERT INTO VACINAS_GRIPE (VAG_CAS_ID, VAG_DATA)
    VALUES (:vagCasId, :vagData)`,
    {
      vagCasId: vagCasId,
      vagData: vagData,
    }
  );
}
