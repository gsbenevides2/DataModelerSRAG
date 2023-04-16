/*
    Para eu fazer o historiamento do banco eu preciso:
        Ver quais são as tabelas do DB
        Para cada tabela:
            Procurar quais são as colunas que são chave primária
            Verificar a estrutura de cada coluna pegando seu tipo e tamanho
            Criar a tabela com o prefixo "H"
            Criar as colunas com o mesmo nome e tipo da tabela original
            Criar a coluna com o Trigrama da tabela original chamada "XXX_DT_HIST"
            Definir as mesmas colunas de chave primaria da tabela original como chave primaria da tabela historica e incluir da coluna de data como chave primaria também
            Realizar os comentarios do dicionário de dados para cada coluna a coluna de data tera o comentário como "Data de historiamento"
                Não esquecer do dicionário de dados da tabela que será o seguinte padrão:
                    "Tabela de historiamento da tabela XXX"
        
        Perguntar para a professora:
            As colunas que possuem restrição de não nulicidade devem ter essa restrição replicada?
            Qual o trigrama para as restrições de chave primaria? Estou usando PK_H_XXX
*/

import type OracleDB from "oracledb";
import { type Column, type Table } from "./types";

async function listAllTablesInDatabase(
  connection: OracleDB.Connection
): Promise<string[]> {
  interface UserTable {
    TABLE_NAME: string;
  }
  const query = "SELECT TABLE_NAME FROM USER_TABLES";
  const result = await connection.execute(query);
  const tables: UserTable[] = result.rows as UserTable[];
  return tables.map((table) => table.TABLE_NAME);
}

async function getColumns(
  connection: OracleDB.Connection,
  tableName: string
): Promise<Column[]> {
  interface UserTabColumns {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    DATA_LENGTH: number;
  }
  let query = `SELECT COLUMN_NAME, DATA_TYPE, DATA_LENGTH FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' ORDER BY COLUMN_ID`;
  let result = await connection.execute(query);
  const userTabColumns: UserTabColumns[] = result.rows as UserTabColumns[];
  /* Change the code bellow to use for block structure */
  const columns: Column[] = [];

  for (const column of userTabColumns) {
    query = `SELECT COMMENTS FROM USER_COL_COMMENTS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${column.COLUMN_NAME}'`;
    result = await connection.execute(query);
    interface USER_COL_COMMENTS {
      COMMENTS: string;
    }
    const comments = result.rows as USER_COL_COMMENTS[];
    const comment = comments.length > 0 ? comments[0].COMMENTS : "";

    query = `SELECT COUNT(*) CT FROM USER_CONS_COLUMNS A LEFT OUTER JOIN USER_CONSTRAINTS B ON A.CONSTRAINT_NAME = B.CONSTRAINT_NAME WHERE B.CONSTRAINT_TYPE = 'P' AND A.TABLE_NAME = '${tableName}' AND A.COLUMN_NAME = '${column.COLUMN_NAME}'`;
    result = await connection.execute(query);
    interface USER_CONS_COLUMNS {
      CT: number;
    }
    const count = result.rows as USER_CONS_COLUMNS[];
    const isPrimaryKey = count[0].CT === 1;

    columns.push({
      name: column.COLUMN_NAME,
      type: column.DATA_TYPE,
      size: column.DATA_LENGTH,
      isPrimaryKey,
      comment,
    });
  }

  return columns;
}

async function getTable(
  connection: OracleDB.Connection,
  tableName: string
): Promise<Table> {
  const columns = await getColumns(connection, tableName);
  const query = `SELECT COMMENTS FROM USER_TAB_COMMENTS WHERE TABLE_NAME = '${tableName}'`;
  const result = await connection.execute(query);
  const comments = result.rows as string[];
  const comment = comments.length > 0 ? comments[0] : "";
  const trigram = columns[0].name.substring(0, 3);

  return {
    name: tableName,
    columns,
    comment,
    trigram,
  };
}

export async function getDbStructure(
  connection: OracleDB.Connection
): Promise<Table[]> {
  const tableNames = await listAllTablesInDatabase(connection);
  const tables: Table[] = [];

  for (const tableName of tableNames) {
    const table = await getTable(connection, tableName);
    tables.push(table);
  }

  return tables;
}
