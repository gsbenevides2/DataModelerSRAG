import OracleDB from "oracledb";

// 1 - Influenza A
// 2 - Influenza B
// 3 - SARS-Cov-2
// 4 - Virus Sincicial Respiratório
// 5 - Parainfluenza 1
// 6 - Parainfluenza 2
// 7 - Parainfluenza 3
// 8 - Parainfluenza 4
// 9 - Adenovírus
// 10 - Metapneumovírus
//  11 - Bocavírus
// 12 - Rinovírus
// 13 - Outros

export async function insertTesteAntigeno(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const teaCasId = casId;
  const teaTtaId = row.TP_TES_AN?.length ? row.TP_TES_AN : null;
  const teaRtaId = row.RES_AN?.length ? row.RES_AN : null;
  const teaDataResultado = row.DT_RES_AN?.length ? row.DT_RES_AN : null;

  if ((teaTtaId || teaRtaId || teaDataResultado) === null) return;

  await connection.execute(
    `INSERT INTO TESTES_ANTIGENO (TEA_CAS_ID, TEA_TTA_ID, TEA_RTA_ID, TEA_DATA_RESULTADO)
     VALUES(:teaCasId, :teaTtaId, :teaRtaId, :teaDataResultado)`,
    {
      teaCasId: teaCasId,
      teaRtaId: teaRtaId,
      teaTtaId: teaTtaId,
      teaDataResultado: teaDataResultado,
    }
  );

  await insertInfluenza(connection, row, casId);
  await insertOthers(connection, row, casId);
}

async function insertInfluenza(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.POS_AN_FLU !== "1") return;
  let tsaVirId = null;
  if (row.TP_FLU_AN === "1") tsaVirId = 1;
  else if (row.TP_FLU_AN === "2") tsaVirId = 2;

  if (tsaVirId === null) return;

  await connection.execute(
    `INSERT INTO TESTES_ANTIGENOS_VIRUS (TSA_TEA_ID, TSA_VIR_ID)
         VALUES(:tsaCasId, :tsaVirId)`,
    {
      tsaCasId: casId,
      tsaVirId: tsaVirId,
    }
  );
}

async function insertOthers(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  type HashMap = {
    [key in keyof Columns]: number;
  };
  type Values = {
    tsaCasId: number;
    tsaVirId: number;
  }[];

  const values: Values = [];

  const hashMap: Partial<HashMap> = {
    AN_SARS2: 3,
    AN_VSR: 4,
    AN_PARA1: 5,
    AN_PARA2: 6,
    AN_PARA3: 7,
    AN_ADENO: 9,
    AN_OUTRO: 13,
  };

  for (const key in hashMap) {
    const a = key as keyof HashMap;
    const b = hashMap[a] as number;
    if (row[a] === "1") {
      values.push({ tsaCasId: casId, tsaVirId: b });
    }
  }

  if (values.length === 0) return;

  await connection.executeMany(
    `INSERT INTO TESTES_ANTIGENOS_VIRUS (TSA_TEA_ID, TSA_VIR_ID)
            VALUES(:tsaCasId, :tsaVirId)`,
    values
  );
}
