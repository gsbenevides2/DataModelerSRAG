import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertAntiviraisGripe(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.ANTIVIRAL !== "1") return;

  const cagAngId = row.TP_ANTIVIR.length > 0 ? row.TP_ANTIVIR : null;
  const cagData = validateDateFormat(row.DT_ANTIVIR);

  const params = {
    cagAngId,
    casId,
    cagData,
  };
  try {
    await connection.execute(
      `INSERT INTO CASOS_ANTIVIRAIS_GRIPE (CAG_ANG_ID, CAG_CAS_ID, CAG_DATA) 
    VALUES (:cagAngId, :casId, :cagData)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertAntiviraisGripe", e, params);
  }
}
