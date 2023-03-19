import OracleDB from "oracledb";

export async function insertTomografias(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const ctoCasId = casId;
  if (row.TOMO_RES === null) return;
  if (row.TOMO_RES === undefined) return;
  if (row.TOMO_RES === "") return;
  const ctoAstId = Number(row.TOMO_RES);
  let ctoDate = null;
  if (row.DT_TOMO?.length > 0) ctoDate = row.DT_TOMO;

  await connection.execute(
    `INSERT INTO CASOS_TOMOGRAFIA (CTO_CAS_ID, CTO_AST_ID, CTO_DATE)
    VALUES (:ctoCasId, :ctoAstId, :ctoDate)`,
    {
      ctoCasId: ctoCasId,
      ctoAstId: ctoAstId,
      ctoDate: ctoDate,
    }
  );
}
