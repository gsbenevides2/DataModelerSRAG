import type OracleDB from "oracledb";
import { OracleError } from "./OracleError";

export async function getUnidadeId(
  connection: OracleDB.Connection,
  uniCodCnesId: string
): Promise<number> {
  interface OraReturn {
    UNI_ID: number;
  }

  let result: OracleDB.Result<OraReturn>;

  try {
    result = await connection.execute<OraReturn>(
      `SELECT uni_id FROM unidades WHERE uni_cod_cnes = :uniCodCnesId`,
      [uniCodCnesId]
    );
  } catch (e: any) {
    throw new OracleError("getUnidadeId", e, [uniCodCnesId]);
  }

  if (result.rows?.length === 0 || result.rows === undefined) {
    throw new Error(`Unidade não encontrada Cod. CNES: ${uniCodCnesId}`);
  }

  return result.rows[0].UNI_ID;
}
