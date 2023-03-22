import OracleDB from "oracledb";

type DoseIdentifier = {
  doseId: number;
  fabColum: keyof Columns;
  loteColum: keyof Columns;
  dataColum: keyof Columns;
};

const dose1: DoseIdentifier = {
  doseId: 1,
  fabColum: "FAB_COV_1",
  loteColum: "LOTE_1_COV",
  dataColum: "DOSE_1_COV",
};

const dose2: DoseIdentifier = {
  doseId: 2,
  fabColum: "FAB_COV_2",
  loteColum: "LOTE_2_COV",
  dataColum: "DOSE_2_COV",
};

const doseRef1: DoseIdentifier = {
  doseId: 3,
  fabColum: "FAB_COVREF",
  loteColum: "LOTE_REF",
  dataColum: "DOSE_REF",
};

/*
Em 2021 ainda não existem dados da segunda dose de reforço

const doseRef2: DoseIdentifier = {
    doseId: 4,
    fabColum: "FAB_COVREF2",
    loteColum: "LOTE_REF2",
    dataColum: "DOSE_REF2",
}Date
*/

const doses: DoseIdentifier[] = [dose1, dose2, doseRef1];

type InsertValues = {
  vacCasId: number;
  vacDoseId: number;
  vacFab: number | null;
  vacLote: string | null;
  vacDataAplicacao: string | null;
}[];

function identifyFab(fabText: string): number | null {
  if (fabText.length == 0) {
    return null;
  }

  const start = fabText.substring(0, 2);
  const coders = {
    "85": 1,
    "86": 2,
    "87": 4,
    "88": 3,
    "89": 1,
  };

  const result = coders[start as keyof typeof coders] || null;

  return result || 5;
}

export async function insertVacinas(
  connection: OracleDB.Connection,
  row: Columns,
  vacCasId: number
) {
  const values: InsertValues = [];

  for (const dose of doses) {
    const vacFab = identifyFab(row[dose.fabColum]);
    const vacLote =
      row[dose.loteColum]?.length > 0 ? row[dose.loteColum] : null;
    const vacDataAplicacao =
      row[dose.dataColum]?.length > 0 ? row[dose.dataColum] : null;

    if ((vacFab || vacLote || vacDataAplicacao) == null) continue;
    else
      values.push({
        vacCasId,
        vacDoseId: dose.doseId,
        vacFab,
        vacLote,
        vacDataAplicacao,
      });
  }

  if (values.length == 0) return;

  const sql = `
        INSERT INTO VACINAS_COVID (
            VAC_CAS_ID,
            VAC_DOS_ID,
            VAC_FAB_ID,
            VAC_LOTE,
            VAC_DATA_APLICACAO
        ) VALUES (
            :vacCasId,
            :vacDoseId,
            :vacFab,
            :vacLote,
            :vacDataAplicacao
        )
    `;

  await connection.executeMany(sql, values);
}
