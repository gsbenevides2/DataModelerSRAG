import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

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
  const teaTtaId = row.TP_TES_AN?.length !== 0 ? row.TP_TES_AN : null;
  const teaRtaId = row.RES_AN?.length !== 0 ? row.RES_AN : null;
  const teaDataResultado = validateDateFormat(row.DT_RES_AN);

  if ((teaTtaId != null || teaRtaId != null || teaDataResultado) === null)
    return;

  const params = {
    teaCasId,
    teaRtaId,
    teaTtaId,
    teaDataResultado,
  };

  try {
    await connection.execute(
      `INSERT INTO TESTES_ANTIGENO (TEA_CAS_ID, TEA_TTA_ID, TEA_RTA_ID, TEA_DATA_RESULTADO)
     VALUES(:teaCasId, :teaTtaId, :teaRtaId, :teaDataResultado)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertTesteAntigeno", e, params);
  }

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

  const params = {
    tsaCasId: casId,
    tsaVirId,
  };

  try {
    await connection.execute(
      `INSERT INTO TESTES_ANTIGENOS_VIRUS (TSA_TEA_ID, TSA_VIR_ID)
         VALUES(:tsaCasId, :tsaVirId)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertAntigenosInfluenza", e, params);
  }
}

async function insertOthers(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  type HashMap = {
    [key in keyof Columns]: number;
  };
  type Values = Array<{
    tsaCasId: number;
    tsaVirId: number;
  }>;

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

  try {
    await connection.executeMany(
      `INSERT INTO TESTES_ANTIGENOS_VIRUS (TSA_TEA_ID, TSA_VIR_ID)
            VALUES(:tsaCasId, :tsaVirId)`,
      values
    );
  } catch (e: any) {
    throw new OracleError("insertAntigenosOthers", e, values);
  }
}
