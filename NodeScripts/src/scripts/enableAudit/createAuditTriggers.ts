import { type Connection } from "oracledb";
import { connectToDatabase } from "../../helpers/connectToDatabase";

async function readTableInformationFromDatabase(
  connection: Connection
): Promise<string[][]> {
  interface DatabaseReturn {
    TABLE_NAME: string;
    COLUMN_NAME: string;
  }
  const result = await connection.execute<DatabaseReturn>(
    `SELECT table_name, column_name
    FROM user_tab_columns
    WHERE table_name LIKE 'H_%'`
  );

  const array = [];

  let j = 0;
  if (result.rows === undefined)
    throw new Error("Erro ao ler as informações do banco de dados!");

  for (let i = 0; i < result.rows.length; i++) {
    if (
      array[j - 1] !== undefined &&
      result.rows[i].TABLE_NAME === array[j - 1][0]
    ) {
      array[j - 1].push(result.rows[i].COLUMN_NAME);
    } else {
      array.push([result.rows[i].TABLE_NAME, result.rows[i].COLUMN_NAME]);
      j++;
    }
  }
  return array;
}

function gerarSQL(arrayTabelaEColunas: string[]): string {
  const dadosTabelaEColunas = arrayTabelaEColunas;

  let scriptSQL = `
CREATE OR REPLACE TRIGGER tg_aud_h_${dadosTabelaEColunas[1]
    .substring(0, 3)
    .toLowerCase()}
AFTER DELETE OR UPDATE
ON ${dadosTabelaEColunas[0]}
FOR EACH ROW
DECLARE
    user_bd VARCHAR2(30) := sys_context('USERENV', 'CURRENT_USER');
    user_so VARCHAR2(30) := sys_context('USERENV', 'OS_USER');
    tabela VARCHAR2(30) := '${dadosTabelaEColunas[0]}';
    operacao CHAR(1);

BEGIN
    IF DELETING THEN
        operacao := 'D';
        auditoria.proc_insere(
          SYSDATE,
          tabela,
          operacao,
          NULL,
          NULL,
          NULL,
          user_bd,
          user_so,
          :OLD.rowid
        );
    ELSE
        operacao := 'U';
    END IF;
`;

  for (let i = 1; i < dadosTabelaEColunas.length; i++) {
    scriptSQL += `
    IF (:OLD.${dadosTabelaEColunas[i]} <> :NEW.${dadosTabelaEColunas[i]}) THEN
        auditoria.proc_insere(
            SYSDATE,
            tabela,
            operacao,
            '${dadosTabelaEColunas[i]}',
            :OLD.${dadosTabelaEColunas[i]},
            :NEW.${dadosTabelaEColunas[i]},
            user_bd,
            user_so,
            :OLD.rowid
        );
    END IF;
    `;
  }

  scriptSQL += `
END;`;

  return scriptSQL;
}

export async function createAuditTriggers(
  connectionString: string
): Promise<void> {
  const connection = await connectToDatabase("APP", "APP123", connectionString);
  const arrayTabelaEColunas = await readTableInformationFromDatabase(
    connection
  );
  const scriptsSQL = arrayTabelaEColunas.map(gerarSQL);

  for (const scriptSQL of scriptsSQL) {
    await connection.execute(scriptSQL);
  }
  await connection.close();
}
