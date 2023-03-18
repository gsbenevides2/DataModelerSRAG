import OracleDB from "oracledb";

export async function getMunicipioId(
  connection: OracleDB.Connection,
  muniCodIbge: string
): Promise<number> {
  type OraReturn = {
    MUN_ID: number;
  };

  const result = await connection.execute<OraReturn>(
    `SELECT mun_id FROM municipios WHERE mun_cod_ibge = :muniCodIbge`,
    [muniCodIbge]
  );

  if (result.rows?.length == null) {
    console.log(`Município não encontrado Cod. IBGE: ${muniCodIbge}`);
    process.exit(1);
  }

  return result.rows[0].MUN_ID;
}
