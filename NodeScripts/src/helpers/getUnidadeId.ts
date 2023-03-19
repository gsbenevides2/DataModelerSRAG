import OracleDB from "oracledb";

export async function getUnidadeId(
  connection: OracleDB.Connection,
  uniCodCnesId: string
): Promise<number> {
  type OraReturn = {
    UNI_ID: number;
  };
  const result = await connection.execute<OraReturn>(
    `SELECT uni_id FROM unidades WHERE uni_cod_cnes = :uniCodCnesId`,
    [uniCodCnesId]
  );

  if (result.rows?.length == null) {
    console.log(`Unidade não encontrada Cod. CNES: ${uniCodCnesId}`);
    process.exit(1);
  }

  return result.rows[0].UNI_ID;
}
