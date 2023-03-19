import OracleDB from "oracledb";
type RowsToInsert = {
  ccoCasId: number;
  ccoComId: number;
}[];

type ColumnsKeys = Array<keyof Columns>;

export async function insertComorbidades(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.FATOR_RISC !== "1") return;
  const rowsToInsert: RowsToInsert = [];

  const keys: ColumnsKeys = [
    "PUERPERA",
    "CARDIOPATI",
    "HEMATOLOGI",
    "SIND_DOWN",
    "HEPATICA",
    "ASMA",
    "DIABETES",
    "NEUROLOGIC",
    "PNEUMOPATI",
    "IMUNODEPRE",
    "RENAL",
    "OBESIDADE",
    "OUT_MORBI",
  ];

  for (let i = 0; i < keys.length; i++) {
    if (row[keys[i]] === "1") {
      rowsToInsert.push({
        ccoCasId: casId,
        ccoComId: i + 1,
      });
    }
  }

  await connection.executeMany(
    `INSERT INTO CASOS_COMORBIDADES (CCO_CAS_ID, CCO_COM_ID)
        VALUES (:ccoCasId, :ccoComId)`,
    rowsToInsert
  );
}
