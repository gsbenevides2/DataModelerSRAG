import type OracleDB from "oracledb";
import { OracleError } from "../../helpers/OracleError";
import { type Columns } from "./types";

const municipioExists = async (
  codIBGE: string,
  connection: OracleDB.Connection
): Promise<boolean> => {
  const sql = "SELECT mun_id FROM municipios WHERE mun_cod_ibge = :muniCodIbge";
  const params = [codIBGE];

  const result = await connection.execute(sql, params);

  return Boolean(result.rows?.length);
};

const insertMunicipio = async (
  uf: string,
  ibge: string,
  nome: string,
  connection: OracleDB.Connection
): Promise<void> => {
  interface State {
    EST_ID: number;
  }
  const stateId = await connection.execute<State>(
    `SELECT est_id FROM ESTADOS WHERE est_nome = :est_nome`,
    [uf]
  );

  if (stateId.rows?.length == null) {
    throw new Error("State not found: " + uf);
  }
  const { EST_ID } = stateId.rows[0];
  const params = [ibge, nome, EST_ID];
  try {
    await connection.execute(
      `INSERT INTO MUNICIPIOS(mun_cod_ibge, mun_nome, mun_est_id) 
         VALUES(:mun_cod_ibge, :mun_nome, :mun_est_id)`,
      params
    );
  } catch (e) {
    throw new OracleError("insertMunicipio", e, params);
  }
};

export async function insertMunicipios(
  row: Columns,
  connection: OracleDB.Connection
): Promise<void> {
  if (
    row.CO_MUN_NOT.length > 0 &&
    !(await municipioExists(row.CO_MUN_NOT, connection))
  ) {
    await insertMunicipio(
      row.SG_UF_NOT,
      row.CO_MUN_NOT,
      row.ID_MUNICIP,
      connection
    );
  }
  await connection.commit();

  if (
    row.CO_MUN_RES.length > 0 &&
    !(await municipioExists(row.CO_MUN_RES, connection))
  ) {
    await insertMunicipio(
      row.SG_UF,
      row.CO_MUN_RES,
      row.ID_MN_RESI,
      connection
    );
  }
  await connection.commit();

  if (
    row.CO_MU_INTE.length > 0 &&
    !(await municipioExists(row.CO_MU_INTE, connection))
  ) {
    await insertMunicipio(
      row.SG_UF_INTE,
      row.CO_MU_INTE,
      row.ID_MN_INTE,
      connection
    );
  }
  await connection.commit();
}
