import type OracleDB from "oracledb";
import { getMunicipioId } from "../helpers/getMunicipioId";


const unidadeExists = async (
  codCnes: string,
  connection: OracleDB.Connection
) => {
  const sql = "SELECT uni_id FROM unidades WHERE uni_cod_cnes = :uniCodCnes";
  const params = [codCnes];
  const result = await connection.execute(sql, params);
  return Boolean(result.rows?.length);
};

export async function insertUnidade(
  row: Columns,
  connection: OracleDB.Connection
) {
  if (row.CO_UNI_NOT && !(await unidadeExists(row.CO_UNI_NOT, connection))) {
    const cityId = await getMunicipioId(connection, row.CO_MUN_NOT);
    const sql =
      "INSERT INTO UNIDADES (uni_cod_cnes, uni_nome, uni_mun_id) VALUES(:uni_cod_cnes, :uni_nome, :uni_mun_id)";
    const params = [row.CO_UNI_NOT, row.ID_UNIDADE, cityId];
    await connection.execute(sql, params);
  }
  await connection.commit();
}
