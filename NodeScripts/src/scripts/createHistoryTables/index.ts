import type OracleDB from "oracledb";
import { createHistoryDbStructure } from "./createHistoryDbStructure";
import { getDbStructure } from "./getDbStructure";
import { parseDbStructureToSQL } from "./parseDbStructureToSQL";
import { runTriggers } from "./runTriggers";
export enum Events {
  GET_STRUCTURE = "get_structure",
  CREATE_SQL = "create_sql",
  RUN_SQL = "run_sql",
  CREATE_STRUCTURE = "create_structure",
  FINISH = "finish",
  ERROR = "error",
  RUNNING_TRIGGERS = "running_triggers",
}
async function runStatements(
  connection: OracleDB.Connection,
  statements: string[]
): Promise<void> {
  for (const statement of statements) {
    try {
      await connection.execute(statement);
    } catch (error) {
      console.error("Erro ao executar a consulta!", statement);
      throw error;
    }
  }
}

export function createHistoryTables(
  connection: OracleDB.Connection,
  eventCb: (type: Events) => void
): void {
  async function start(): Promise<void> {
    try {
      eventCb(Events.GET_STRUCTURE);
      const dbStructure = await getDbStructure(connection);

      eventCb(Events.CREATE_STRUCTURE);
      const historyDbStructure = createHistoryDbStructure(dbStructure);
      eventCb(Events.CREATE_SQL);
      const statements = parseDbStructureToSQL(historyDbStructure);
      await runStatements(connection, statements);
      eventCb(Events.RUNNING_TRIGGERS);
      await runTriggers(connection);
      eventCb(Events.FINISH);
    } catch (error) {
      eventCb(Events.ERROR);
      console.error(error);
    }
  }
  void start();
}
