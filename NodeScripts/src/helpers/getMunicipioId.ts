import OracleDB from "oracledb";
import { OracleError } from "./OracleError";

export async function getMunicipioId(
  connection: OracleDB.Connection,
  muniCodIbge: string
): Promise<number> {
  type OraReturn = {
    MUN_ID: number;
  };

  let result: OracleDB.Result<OraReturn>;

  try {
    result = await connection.execute<OraReturn>(
      `SELECT mun_id FROM municipios WHERE mun_cod_ibge = :muniCodIbge`,
      [muniCodIbge]
    );
  } catch (e: any) {
    throw new OracleError("getMunicipioId", e, [muniCodIbge]);
  }

  if (result.rows?.length === 0 || result.rows === undefined) {
    throw new Error(`Município não encontrado Cod. IBGE: ${muniCodIbge}`);
  }

  return result.rows[0].MUN_ID;
}
