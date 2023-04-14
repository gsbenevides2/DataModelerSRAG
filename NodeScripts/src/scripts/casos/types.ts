export interface Columns {
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
  ESTRANG?: string;
  VACINA_COV?: string;
  DOSE_1_COV?: string;
  DOSE_2_COV?: string;
  DOSE_REF?: string;
  FAB_COV_1?: string;
  FAB_COV_2?: string;
  FAB_COVREF?: string;
  LOTE_REF?: string;
  LAB_PR_COV?: string;
  LOTE_1_COV?: string;
  LOTE_2_COV?: string;
  FNT_IN_COV?: string;
  TRAT_COV?: string;
  TIPO_TRAT?: string;
  OUT_TRAT?: string;
  DT_TRT_COV?: string;
}
export const suportedYears = ["2020", "2021", "2022", "2023"] as const;
export type SuportedYears = (typeof suportedYears)[number];
