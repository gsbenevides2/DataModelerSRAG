import type OracleDB from "oracledb";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createInderteminateProgressBar,
} from "../helpers/uiHelpers";
import path from "path";
import runSQLScript from "../helpers/runSQLScript";

import { connectToDatabase } from "../helpers/connectToDatabase";
import { thirdPage } from "./thirdPage";

async function criarUsuário(connection: OracleDB.Connection): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    // "Script1",
    // "tables",
    "createUser.sql"
  );
  await runSQLScript(connection, sqlPath);
}

async function runDDL(connection: OracleDB.Connection): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "Script1",
    "start.sql"
  );
  await runSQLScript(connection, sqlPath);
}
async function runDML(connection: OracleDB.Connection): Promise<void> {
  const sqlPath = path.resolve(
    process.cwd(),
    "..",
    "ScriptsSQL",
    "Script2",
    "start.sql"
  );
  await runSQLScript(connection, sqlPath);
}

async function start(
  connection: OracleDB.Connection,
  connectionString: string
): Promise<OracleDB.Connection> {
  await criarUsuário(connection);
  await connection.close();
  const newConnection = await connectToDatabase(
    "APP",
    "APP123",
    connectionString
  );
  await runDDL(newConnection);
  await runDML(newConnection);
  return newConnection;
}

export async function secondPage(
  connection: OracleDB.Connection,
  connectionString: string
): Promise<void> {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Aguarde uns instantes!");
  const subTitle = createTextLabel("Estamos preparando o banco para você!");
  const progressBar = createInderteminateProgressBar();

  progressBar.setVisible(true);

  const statusLabel = createTextLabel("");

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);

  start(connection, connectionString)
    .then((newConnection) => {
      statusLabel.setText("Banco de dados preparado com sucesso!");
      progressBar.setVisible(false);
      thirdPage(newConnection);
    })
    .catch((err: Error) => {
      statusLabel.setText(
        `Erro ao preparar o banco de dados.\nDetalhes: ${String(err)}`
      );
      progressBar.setVisible(false);
    });
  win.setCentralWidget(centralWidget);
}
