import type OracleDB from "oracledb";
import { getMunicipioId } from "../../../helpers/getMunicipioId";
import { getUnidadeId } from "../../../helpers/getUnidadeId";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertCaso(
  connection: OracleDB.Connection,
  row: Columns
): Promise<number> {
  const dataNotificacao = validateDateFormat(row.DT_NOTIFIC);
  const dataPrimeirosSintomas = validateDateFormat(row.DT_SIN_PRI);
  const unidadeId = await getUnidadeId(connection, row.CO_UNI_NOT);
  const estrangeiro = row.ESTRANG === "1" ? 1 : 0;
  let genId: number = 9;
  if (row.CS_SEXO === "M") genId = 1;
  else if (row.CS_SEXO === "F") genId = 2;
  const dataNascimento = validateDateFormat(row.DT_NASC);
  let idadeGestacional = row.CS_GESTANT.length > 0 ? Number(row.CS_GESTANT) : 6;
  if (idadeGestacional === 0) idadeGestacional = 6;
  const racaCor = row.CS_RACA.length > 0 ? Number(row.CS_RACA) : 9;
  const escolaridade = row.CS_ESCOL_N.length > 0 ? Number(row.CS_ESCOL_N) : 9;
  const municipioId = await getMunicipioId(connection, row.CO_MUN_RES);
  const zona = row.CS_ZONA.length > 0 ? Number(row.CS_ZONA) : 9;
  let nosocomial: number | null = null;
  if (row.NOSOCOMIAL === "1") nosocomial = 1;
  else if (row.NOSOCOMIAL === "0") nosocomial = 0;
  const suporteVentilatorio =
    row.SUPORT_VEN.length > 0 ? Number(row.SUPORT_VEN) : 9;
  const classificacaoFinal =
    row.CLASSI_FIN.length > 0 ? Number(row.CLASSI_FIN) : 4;
  const dataDigitacao = validateDateFormat(row.DT_DIGITA);
  let animal = null;
  if (row.AVE_SUINO?.length > 0) animal = row.AVE_SUINO;

  const params = {
    dataNotificacao,
    dataPrimeirosSintomas,
    unidadeId,
    estrangeiro,
    genId,
    dataNascimento,
    idadeGestacional,
    racaCor,
    escolaridade,
    municipioId,
    zona,
    nosocomial,
    suporteVentilatorio,
    classificacaoFinal,
    dataDigitacao,
    animal,
  };

  let result: OracleDB.Result<any>;
  try {
    result = await connection.execute(
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
            CAS_DATA_DIGITACAO,
            CAS_TAN_ID
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
            :dataDigitacao,
            :animal
        )`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertCaso", e, params);
  }

  const lastRowId = result.lastRowid;

  if (lastRowId == null) {
    console.error(
      "Ocorreu um erro ao inserir o caso não consegui obter o ID da linha inserida"
    );
    process.exit(1);
  }

  interface OraReturn {
    CAS_ID: number;
  }
  let result2: OracleDB.Result<OraReturn>;

  const params2 = {
    id: lastRowId,
  };

  try {
    result2 = await connection.execute<OraReturn>(
      `SELECT CAS_ID FROM CASOS WHERE ROWID = :id`,
      params2
    );
  } catch (e: any) {
    throw new OracleError("retriveCasoId", e, params2);
  }

  if (result2.rows == null || result2.rows.length === 0) {
    console.error(
      "Ocorreu um erro ao inserir o caso não consegui obter o ID do caso a apartir do id da linha inserida"
    );
    process.exit(1);
  }

  return result2.rows[0].CAS_ID;
}