import path from "path";
import { connectToDatabase } from "../helpers/connectToDatabase";
import { readCSVFile } from "../helpers/readCSVFile";

type Columns = {
  DT_NOTIFIC: string;
  SEM_NOT: string;
  DT_SIN_PRI: string;
  SEM_PRI: string;
  SG_UF_NOT: string;
  ID_REGIONA: string;
  CO_REGIONA: string;
  ID_MUNICIP: string;
  CO_MUN_NOT: string;
  ID_UNIDADE: string;
  CO_UNI_NOT: string;
  CS_SEXO: string;
  DT_NASC: string;
  NU_IDADE_N: string;
  TP_IDADE: string;
  COD_IDADE: string;
  CS_GESTANT: string;
  CS_RACA: string;
  CS_ESCOL_N: string;
  ID_PAIS: string;
  CO_PAIS: string;
  SG_UF: string;
  ID_RG_RESI: string;
  CO_RG_RESI: string;
  ID_MN_RESI: string;
  CO_MUN_RES: string;
  CS_ZONA: string;
  SURTO_SG: string;
  NOSOCOMIAL: string;
  AVE_SUINO: string;
  FEBRE: string;
  TOSSE: string;
  GARGANTA: string;
  DISPNEIA: string;
  DESC_RESP: string;
  SATURACAO: string;
  DIARREIA: string;
  VOMITO: string;
  OUTRO_SIN: string;
  OUTRO_DES: string;
  PUERPERA: string;
  FATOR_RISC: string;
  CARDIOPATI: string;
  HEMATOLOGI: string;
  SIND_DOWN: string;
  HEPATICA: string;
  ASMA: string;
  DIABETES: string;
  NEUROLOGIC: string;
  PNEUMOPATI: string;
  IMUNODEPRE: string;
  RENAL: string;
  OBESIDADE: string;
  OBES_IMC: string;
  OUT_MORBI: string;
  MORB_DESC: string;
  VACINA: string;
  DT_UT_DOSE: string;
  MAE_VAC: string;
  DT_VAC_MAE: string;
  M_AMAMENTA: string;
  DT_DOSEUNI: string;
  DT_1_DOSE: string;
  DT_2_DOSE: string;
  ANTIVIRAL: string;
  TP_ANTIVIR: string;
  OUT_ANTIV: string;
  DT_ANTIVIR: string;
  HOSPITAL: string;
  DT_INTERNA: string;
  SG_UF_INTE: string;
  ID_RG_INTE: string;
  CO_RG_INTE: string;
  ID_MN_INTE: string;
  CO_MU_INTE: string;
  UTI: string;
  DT_ENTUTI: string;
  DT_SAIDUTI: string;
  SUPORT_VEN: string;
  RAIOX_RES: string;
  RAIOX_OUT: string;
  DT_RAIOX: string;
  AMOSTRA: string;
  DT_COLETA: string;
  TP_AMOSTRA: string;
  OUT_AMOST: string;
  PCR_RESUL: string;
  DT_PCR: string;
  POS_PCRFLU: string;
  TP_FLU_PCR: string;
  PCR_FLUASU: string;
  FLUASU_OUT: string;
  PCR_FLUBLI: string;
  FLUBLI_OUT: string;
  POS_PCROUT: string;
  PCR_VSR: string;
  PCR_PARA1: string;
  PCR_PARA2: string;
  PCR_PARA3: string;
  PCR_PARA4: string;
  PCR_ADENO: string;
  PCR_METAP: string;
  PCR_BOCA: string;
  PCR_RINO: string;
  PCR_OUTRO: string;
  DS_PCR_OUT: string;
  CLASSI_FIN: string;
  CLASSI_OUT: string;
  CRITERIO: string;
  EVOLUCAO: string;
  DT_EVOLUCA: string;
  DT_ENCERRA: string;
  DT_DIGITA: string;
  HISTO_VGM: string;
  PAIS_VGM: string;
  CO_PS_VGM: string;
  LO_PS_VGM: string;
  DT_VGM: string;
  DT_RT_VGM: string;
  PCR_SARS2: string;
  PAC_COCBO: string;
  PAC_DSCBO: string;
  OUT_ANIM: string;
  DOR_ABD: string;
  FADIGA: string;
  PERD_OLFT: string;
  PERD_PALA: string;
  TOMO_RES: string;
  TOMO_OUT: string;
  DT_TOMO: string;
  TP_TES_AN: string;
  DT_RES_AN: string;
  RES_AN: string;
  POS_AN_FLU: string;
  TP_FLU_AN: string;
  POS_AN_OUT: string;
  AN_SARS2: string;
  AN_VSR: string;
  AN_PARA1: string;
  AN_PARA2: string;
  AN_PARA3: string;
  AN_ADENO: string;
  AN_OUTRO: string;
  DS_AN_OUT: string;
  TP_AM_SOR: string;
  SOR_OUT: string;
  DT_CO_SOR: string;
  TP_SOR: string;
  OUT_SOR: string;
  DT_RES: string;
  RES_IGG: string;
  RES_IGM: string;
  RES_IGA: string;
  ESTRANG: string;
  VACINA_COV: string;
  DOSE_1_COV: string;
  DOSE_2_COV: string;
  DOSE_REF: string;
  FAB_COV_1: string;
  FAB_COV_2: string;
  FAB_COVREF: string;
  LOTE_REF: string;
  LAB_PR_COV: string;
  LOTE_1_COV: string;
  LOTE_2_COV: string;
  FNT_IN_COV: string;
};

async function main() {
  const connection = await connectToDatabase();
  let actualLine = 0;
  const filePath = path.resolve(
    process.cwd(),
    "data",
    "Dataset Filtrado - 2021.csv"
  );
  await readCSVFile<Columns>(
    filePath,
    async (row) => {
      const dataNotificacao = new Date(row.DT_NOTIFIC);
      const dataPrimeirosSintomas = new Date(row.DT_SIN_PRI);
      // Pegar Id da Unidade que fez o caso
      type OraReturn = {
        UNI_ID: number;
      };

      const result = await connection.execute<OraReturn>(
        `SELECT UNI_ID FROM UNIDADES WHERE UNI_COD_CNES = :cnes`,
        { cnes: row.CO_UNI_NOT }
      );

      if (!result.rows || result.rows.length === 0) {
        console.log(`Unidade não encontrada: ${row.CO_UNI_NOT}`);
        process.exit(1);
      }

      const unidadeId = result.rows[0].UNI_ID;
      const estrangeiro = row.ESTRANG === "1" ? true : false;
      let genId: number = 9;
      if (row.CS_SEXO === "M") genId = 1;
      else if (row.CS_SEXO === "F") genId = 2;
      const dataNascimento = new Date(row.DT_NASC);
      const idadeGetacional = row.CS_GESTANT ? Number(row.CS_GESTANT) : 6;
      const racaCor = row.CS_RACA ? Number(row.CS_RACA) : 9;
      const escolaridade = row.CS_ESCOL_N ? Number(row.CS_ESCOL_N) : 9;
      type OraReturn2 = {
        MUN_ID: number;
      };
      const result2 = await connection.execute<OraReturn2>(
        `SELECT MUN_ID FROM MUNICIPIOS WHERE MUN_COD_IBGE = :ibge`,
        { ibge: row.CO_MUN_RES }
      );

      if (!result2.rows || result2.rows.length === 0) {
        console.log(`Município não encontrado: ${row.CO_MUN_RES}`);
        process.exit(1);
      }

      const municipioId = result2.rows[0].MUN_ID;
      const zona = row.CS_ZONA ? Number(row.CS_ZONA) : 9;

      const nosocomial = row.NOSOCOMIAL
        ? row.NOSOCOMIAL === "1"
          ? true
          : false
        : null;

      const suporteVentilatorio = row.SUPORT_VEN ? Number(row.SUPORT_VEN) : 9;

      const classificacaoFinal = row.CLASSI_FIN ? Number(row.CLASSI_FIN) : 4;

      const dataDigitacao = new Date(row.DT_DIGITA);

      console.log({
        dataNotificação: dataNotificacao,
        dataPrimeirosSintomas,
        unidadeId,
        estrangeiro,
        genId,
        dataNascimento,
        idadeGetacional,
        racaCor,
        escolaridade,
        municipioId,
        zona,
        nosocomial,
        suporteVentilatorio,
        classificaçãoFinal: classificacaoFinal,
        dataDigitacao,
      });

      await connection.execute(
        `INSERT INTO CASOS (CAS_DATA_NOTIFICACAO, CAS_DATA_PRIMEIROS_SINTOMAS, CAS_UNI_ID, CAS_ESTRANGEIRO, CAS_GEN_ID, CAS_DATA_NASCIMENTO, CAS_IDG_ID, CAS_RAC_ID, CAS_ESC_ID, CAS_MUN_ID, CAS_ZON_ID, CAS_NOSOCOMIAL, CAS_SVE_ID, CAS_CLA_ID, CAS_DATA_DIGITACAO) VALUES (:dataNotificacao, :dataPrimeirosSintomas, :unidadeId, :estrangeiro, :genId, :dataNascimento, :idadeGetacional, :racaCor, :escolaridade, :municipioId, :zona, :nosocomial, :suporteVentilatorio, :classificacaoFinal, :dataDigitacao)`,
        {
          dataNotificacao,
          dataPrimeirosSintomas,
          unidadeId,
          estrangeiro: estrangeiro ? 1 : 0,
          genId,
          dataNascimento,
          idadeGetacional,
          racaCor,
          escolaridade,
          municipioId,
          zona,
          nosocomial,
          suporteVentilatorio,
          classificacaoFinal,
          dataDigitacao,
        },
        {
          autoCommit: true,
        }
      );

      process.exit(1);
    },
    {
      delimiter: ";",
      encoding: "utf8",
    }
  );
}

main();
