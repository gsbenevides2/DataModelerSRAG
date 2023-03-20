import OracleDB from "oracledb";
import { getMunicipioId } from "../../helpers/getMunicipioId";

export async function insertInternacoes(
  connection: OracleDB.Connection,
  row: Columns,
  casId: number
) {
  if (row.HOSPITAL !== "1") return;

  const intCasId = casId;
  const intData = row.DT_INTERNA?.length > 0 ? row.DT_INTERNA : null;
  let intMunId = null;

  if (row.CO_MU_INTE?.length > 0) {
    intMunId = await getMunicipioId(connection, row.CO_MU_INTE);
  }

  await connection.execute(
    `INSERT INTO INTERNACOES (INT_CAS_ID, INT_DATA, INT_MUN_ID)
            VALUES (:intCasId, :intData, :intMunId)`,
    {
      intCasId: intCasId,
      intData: intData,
      intMunId: intMunId,
    }
  );
}
