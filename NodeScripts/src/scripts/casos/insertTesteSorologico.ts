import OracleDB from "oracledb";

export async function insertTesteSorologico(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  const tsoCasId = casId;

  const tsoTasId = row.TP_AM_SOR?.length ? row.TP_AM_SOR : null;
  const tsoTtsId = row.TP_SOR?.length ? row.TP_SOR : null;
  const tsoDataColeta = row.DT_CO_SOR?.length ? row.DT_CO_SOR : null;
  const tsoDataResultado = row.DT_RES?.length ? row.DT_RES : null;
  const tsoRtsIgg = row.RES_IGG?.length ? row.RES_IGG : null;
  const tsoRtsIgm = row.RES_IGM?.length ? row.RES_IGM : null;
  const tsoRtsIga = row.RES_IGA?.length ? row.RES_IGA : null;

  if (
    (tsoTasId ||
      tsoTtsId ||
      tsoDataColeta ||
      tsoDataResultado ||
      tsoRtsIgg ||
      tsoRtsIgm ||
      tsoRtsIga) === null
  )
    return;

  await connection.execute(
    `INSERT INTO TESTE_SOROLOGICOS (TSO_CAS_ID, TSO_TAS_ID, TSO_TTS_ID, TSO_DATA_COLETA, TSO_DATA_RESULTADO, TSO_RTS_IGG, TSO_RTS_IGM, TSO_RTS_IGA)
        VALUES(:tsoCasId, :tsoTasId, :tsoTtsId, :tsoDataColeta, :tsoDataResultado, :tsoRtsIgg, :tsoRtsIgm, :tsoRtsIga)`,
    {
      tsoCasId: tsoCasId,
      tsoTasId: tsoTasId,
      tsoTtsId: tsoTtsId,
      tsoDataColeta: tsoDataColeta,
      tsoDataResultado: tsoDataResultado,
      tsoRtsIgg: tsoRtsIgg,
      tsoRtsIgm: tsoRtsIgm,
      tsoRtsIga: tsoRtsIga,
    }
  );
}
