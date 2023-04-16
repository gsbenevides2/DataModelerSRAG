import type OracleDB from "oracledb";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createInderteminateProgressBar,
  createButton,
} from "../../helpers/uiHelpers";

import { createAppUser } from "../../scripts/createAppUser";
import { insertMetadata } from "../../scripts/runDML/insertMetadata";
import { runDDL } from "../../scripts/runDDL";
import { homePage } from "../homePage";

export async function secondPage(
  connection: OracleDB.Connection,
  connectionString: string
): Promise<void> {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Aguarde uns instantes!");
  const subTitle = createTextLabel("Estamos preparando o banco para você!");
  const progressBar = createInderteminateProgressBar();
  const backButton = createButton("Voltar a Tela Inicial");

  progressBar.setVisible(true);
  backButton.hide();
  backButton.addEventListener("clicked", homePage);

  async function start(
    connection: OracleDB.Connection,
    connectionString: string
  ): Promise<void> {
    subTitle.setText(
      "Estamos criando o usuário APP, dando os privilégios necessários!"
    );
    const appUserConnection = await createAppUser(connection, connectionString);
    await connection.close();
    subTitle.setText("Estamos rodando a DDL(Data Definition Language)");
    await runDDL(appUserConnection);
    subTitle.setText(
      "Estamos rodando a DML(Data Manipulation Language) das tabelas de metadados"
    );
    await insertMetadata(appUserConnection);
  }

  start(connection, connectionString)
    .then(() => {
      subTitle.setText("Banco de dados preparado com sucesso!");
      progressBar.setVisible(false);
      backButton.show();
    })
    .catch((err: Error) => {
      subTitle.setText(
        `Erro ao preparar o banco de dados.\nDetalhes: ${String(err)}`
      );
      progressBar.setVisible(false);
    });

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(backButton);

  win.setCentralWidget(centralWidget);
}
