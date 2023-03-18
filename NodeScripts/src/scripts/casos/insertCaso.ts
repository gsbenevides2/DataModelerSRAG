import OracleDB from "oracledb";

type Caso = {
  dataNotificacao: Date;
  dataPrimeirosSintomas: Date;
  unidadeId: number;
  estrangeiro: number;
  genId: number;
  dataNascimento: Date;
  idadeGestacional: number;
  racaCor: number;
  escolaridade: number;
  municipioId: number;
  zona: number;
  nosocomial: number | null;
  suporteVentilatorio: number;
  classificacaoFinal: number;
  dataDigitacao: Date;
};

export async function insertCaso(
  connection: OracleDB.Connection,
  caso: Caso
): Promise<number> {
  const result = await connection.execute(
    `INSERT INTO CASOS (
            CAS_DATA_NOTIFICACAO,
            CAS_DATA_PRIMEIROS_SINTOMAS,
            CAS_UNI_ID,
            CAS_ESTRANGEIRO,
            CAS_GEN_ID,
            CAS_DATA_NASCIMENTO,
            CAS_IDG_ID,
            CAS_RAC_ID,
            CAS_ESC_ID,
            CAS_MUN_ID,
            CAS_ZON_ID,
            CAS_NOSOCOMIAL,
            CAS_SVE_ID,
            CAS_CLA_ID,
            CAS_DATA_DIGITACAO
        ) VALUES (
            :dataNotificacao,
            :dataPrimeirosSintomas,
            :unidadeId,
            :estrangeiro,
            :genId,
            :dataNascimento,
            :idadeGestacional,
            :racaCor,
            :escolaridade,
            :municipioId,
            :zona,
            :nosocomial,
            :suporteVentilatorio,
            :classificacaoFinal,
            :dataDigitacao
        )`,
    {
      dataNotificacao: caso.dataNotificacao,
      dataPrimeirosSintomas: caso.dataPrimeirosSintomas,
      unidadeId: caso.unidadeId,
      estrangeiro: caso.estrangeiro,
      genId: caso.genId,
      dataNascimento: caso.dataNascimento,
      idadeGestacional: caso.idadeGestacional,
      racaCor: caso.racaCor,
      escolaridade: caso.escolaridade,
      municipioId: caso.municipioId,
      zona: caso.zona,
      nosocomial: caso.nosocomial,
      suporteVentilatorio: caso.suporteVentilatorio,
      classificacaoFinal: caso.classificacaoFinal,
      dataDigitacao: caso.dataDigitacao,
    }
  );
  const lastRowId = result.lastRowid;

  if (!lastRowId) {
    console.error(
      "Ocorreu um erro ao inserir o caso não consegui obter o ID da linha inserida"
    );
    process.exit(1);
  }

  type OraReturn = {
    CAS_ID: number;
  };
  const result2 = await connection.execute<OraReturn>(
    `SELECT CAS_ID FROM CASOS WHERE ROWID = :id`,
    {
      id: lastRowId,
    }
  );

  if (!result2.rows || result2.rows.length === 0) {
    console.error(
      "Ocorreu um erro ao inserir o caso não consegui obter o ID do caso a apartir do id da linha inserida"
    );
    process.exit(1);
  }

  return result2.rows[0].CAS_ID;
}
