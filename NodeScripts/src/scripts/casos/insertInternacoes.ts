import OracleDB from "oracledb";
import { getMunicipioId } from "../../helpers/getMunicipioId";
import { OracleError } from "../../helpers/OracleError";
import { validateDateFormat } from "../../helpers/validateDateFormat";

export async function insertInternacoes(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
) {
  if (row.HOSPITAL !== "1") return;

  const intCasId = casId;
  const intData = validateDateFormat(row.DT_INTERNA);
  let intMunId = null;

  if (row.CO_MU_INTE?.length > 0) {
    intMunId = await getMunicipioId(connection, row.CO_MU_INTE);
  }

  const params = {
    intCasId: intCasId,
    intData: intData,
    intMunId: intMunId,
  };

  try {
    await connection.execute(
      `INSERT INTO INTERNACOES (INT_CAS_ID, INT_DATA, INT_MUN_ID)
            VALUES (:intCasId, :intData, :intMunId)`,
      params
    );
  } catch (e: any) {
    throw new OracleError("insertInternacoes", e, params);
  }
}
