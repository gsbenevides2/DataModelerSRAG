import type OracleDB from "oracledb";
import { createAuditUser } from "./createAuditUser";
import { createAuditTable } from "./createAuditTable";
import { createAuditTriggers } from "./createAuditTriggers";

export enum Status {
  "RUNNING",
  "SUCCESS",
  "ERROR",
}
type LogCallback = (status: Status, message: string) => void;

export default function enableAudit(
  connection: OracleDB.Connection,
  connectionString: string,
  logCallback: LogCallback
): void {
  async function start(): Promise<void> {
    logCallback(Status.RUNNING, "Criando usuário de auditoria...");
    const audiitConnection = await createAuditUser(
      connection,
      connectionString
    );
    logCallback(Status.RUNNING, "Criando tabela de auditoria...");
    await createAuditTable(audiitConnection);
    logCallback(Status.RUNNING, "Criando triggers de auditoria...");
    await createAuditTriggers(connectionString);
    await audiitConnection.close();
    await connection.close();
  }

  start()
    .then(() => {
      logCallback(Status.SUCCESS, "Auditoria ativada com sucesso.");
    })
    .catch((error) => {
      logCallback(Status.ERROR, error.message);
    });
}
