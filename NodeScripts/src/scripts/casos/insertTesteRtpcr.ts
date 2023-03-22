import OracleDB from "oracledb";

export async function insertTesteRtpcr(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
) {
  const terCasId = casId;
  const terRtrId = row.PCR_RESUL?.length ? row.PCR_RESUL : null;
  const terDataResultado = row.DT_PCR?.length ? row.DT_PCR : null;

  if ((terRtrId || terDataResultado) === null) return;

  await connection.execute(
    `INSERT INTO TESTES_RTPCR (TER_CAS_ID, TER_RTR_ID, TER_DATA_RESULTADO)
       VALUES(:terCasId, :terRtrId, :terDataResultado)`,
    {
      terCasId: terCasId,
      terRtrId: terRtrId,
      terDataResultado: terDataResultado,
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
  if (row.POS_PCRFLU !== "1") return;
  let tsrVirId = null;
  if (row.TP_FLU_PCR === "1") tsrVirId = 1;
  else if (row.TP_FLU_PCR === "2") tsrVirId = 2;

  if (tsrVirId === null) return;

  await connection.execute(
    `INSERT INTO TESTES_RTPCR_VIRUS (TSR_TER_ID, TSR_VIR_ID)
         VALUES(:tsrCasId, :tsrVirId)`,
    {
      tsrCasId: casId,
      tsrVirId: tsrVirId,
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
    tsrCasId: number;
    tsrVirId: number;
  };
  const values: Values[] = [];

  const hasMap: Partial<HashMap> = {
    PCR_SARS2: 3,
    PCR_VSR: 4,
    PCR_PARA1: 5,
    PCR_PARA2: 6,
    PCR_PARA3: 7,
    PCR_PARA4: 8,
    PCR_ADENO: 9,
    PCR_METAP: 10,
    PCR_BOCA: 11,
    PCR_RINO: 12,
    PCR_OUTRO: 13,
  };

  for (const key in hasMap) {
    const a = key as keyof HashMap;
    const b = hasMap[a] as number;
    if (row[a] === "1") {
      values.push({ tsrCasId: casId, tsrVirId: b });
    }
  }

  if (values.length === 0) return;

  await connection.executeMany(
    `INSERT INTO TESTES_RTPCR_VIRUS (TSR_TER_ID, TSR_VIR_ID)
          VALUES(:tsrCasId, :tsrVirId)`,
    values
  );
}
