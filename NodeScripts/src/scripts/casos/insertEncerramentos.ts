import OracleDB from "oracledb";
import { OracleError } from "../../helpers/OracleError";
import { validateDateFormat } from "../../helpers/validateDateFormat";

export async function insertEncerramento(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
): Promise<void> {
  if (row.CRITERIO?.length > 0 || row.DT_ENCERRA?.length > 0) {
    const encCriId = row.CRITERIO ? Number(row.CRITERIO) : null;
    const encData = validateDateFormat(row.DT_ENCERRA);

    const params = {
      casId: casId,
      criterio: encCriId,
      data: encData,
    };

    try {
      await connection.execute(
        `INSERT INTO ENCERRAMENTOS (
                ENC_CAS_ID,
                ENC_CRI_ID,
                ENC_DATA
            ) VALUES (
                :casId,
                :criterio,
                :data
            )`,
        params
      );
    } catch (e: any) {
      throw new OracleError("insertEncerramento", e, params);
    }
  }
}
