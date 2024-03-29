import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

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

  const vagData = validateDateFormat(row.DT_UT_DOSE);

  const params = {
    vagCasId,
    vagData,
  };
  try {
    await connection.execute(
      `INSERT INTO VACINAS_GRIPE (VAG_CAS_ID, VAG_DATA)
    VALUES (:vagCasId, :vagData)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertVacinaGripe", e, params);
  }
}
