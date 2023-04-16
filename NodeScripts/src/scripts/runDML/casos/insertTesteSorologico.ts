import type OracleDB from "oracledb";
import { OracleError } from "../../../helpers/OracleError";
import { validateDateFormat } from "../../../helpers/validateDateFormat";
import { type Columns } from "../types";

export async function insertTesteSorologico(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const tsoCasId = casId;

  const tsoTasId = row.TP_AM_SOR?.length !== 0 ? row.TP_AM_SOR : null;
  const tsoTtsId = row.TP_SOR?.length !== 0 ? row.TP_SOR : null;
  const tsoDataColeta = validateDateFormat(row.DT_CO_SOR);
  const tsoDataResultado = validateDateFormat(row.DT_RES);
  const tsoRtsIgg = row.RES_IGG?.length !== 0 ? row.RES_IGG : null;
  const tsoRtsIgm = row.RES_IGM?.length !== 0 ? row.RES_IGM : null;
  const tsoRtsIga = row.RES_IGA?.length !== 0 ? row.RES_IGA : null;

  if (
    (tsoTasId != null ||
      tsoTtsId != null ||
      tsoDataColeta != null ||
      tsoDataResultado != null ||
      tsoRtsIgg != null ||
      tsoRtsIgm != null ||
      tsoRtsIga) === null
  )
    return;

  const params = {
    tsoCasId,
    tsoTasId,
    tsoTtsId,
    tsoDataColeta,
    tsoDataResultado,
    tsoRtsIgg,
    tsoRtsIgm,
    tsoRtsIga,
  };

  try {
    await connection.execute(
      `INSERT INTO TESTE_SOROLOGICOS (TSO_CAS_ID, TSO_TAS_ID, TSO_TTS_ID, TSO_DATA_COLETA, TSO_DATA_RESULTADO, TSO_RTS_IGG, TSO_RTS_IGM, TSO_RTS_IGA)
        VALUES(:tsoCasId, :tsoTasId, :tsoTtsId, :tsoDataColeta, :tsoDataResultado, :tsoRtsIgg, :tsoRtsIgm, :tsoRtsIga)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertTesteSorologico", e, params);
  }
}
