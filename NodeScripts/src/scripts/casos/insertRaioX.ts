import OracleDB from "oracledb";
import { parseDateStringToDateObject } from "../../helpers/parseDateStingToDate";

export async function insertRaioX(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (!row.RAIOX_RES || row.RAIOX_RES === "") return;
  const raioXResultado = Number(row.RAIOX_RES);

  const raioXData = row.DT_RAIOX
    ? parseDateStringToDateObject(row.DT_RAIOX)
    : null;

  await connection.execute(
    `INSERT INTO CASOS_RAIOSX (CRX_CAS_ID, CRX_RAI_ID,CRX_DATE)
        VALUES (:casId, :raioXResultado, :raioXData)`,
    {
      casId: casId,
      raioXResultado: raioXResultado,
      raioXData: raioXData,
    }
  );
}
