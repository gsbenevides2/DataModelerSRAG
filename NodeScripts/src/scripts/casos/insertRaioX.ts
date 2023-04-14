import type OracleDB from "oracledb";
import { OracleError } from "../../helpers/OracleError";
import { validateDateFormat } from "../../helpers/validateDateFormat";
import { type Columns } from "./types";
export async function insertRaioX(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.RAIOX_RES.length === 0 || row.RAIOX_RES === "") return;
  const raioXResultado = Number(row.RAIOX_RES);

  const raioXData = validateDateFormat(row.DT_RAIOX);

  const params = {
    casId,
    raioXResultado,
    raioXData,
  };

  try {
    await connection.execute(
      `INSERT INTO CASOS_RAIOSX (CRX_CAS_ID, CRX_RAI_ID,CRX_DATE)
        VALUES (:casId, :raioXResultado, :raioXData)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertRaioX", e, params);
  }
}
