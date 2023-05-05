import type OracleDB from "oracledb";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createInderteminateProgressBar,
  createButton,
} from "../../helpers/uiHelpers";

import { homePage } from "../homePage";
import { Events, createHistoryTables } from "../../scripts/createHistoryTables";

export async function secondPage(
  connection: OracleDB.Connection
): Promise<void> {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Aguarde uns instantes!");
  const subTitle = createTextLabel("Estamos preparando o banco para você!");
  const progressBar = createInderteminateProgressBar();
  const backButton = createButton("Voltar a Tela Inicial");

  progressBar.setVisible(true);
  backButton.hide();
  backButton.addEventListener("clicked", homePage);

  function start(connection: OracleDB.Connection): void {
    createHistoryTables(connection, (event) => {
      switch (event) {
        case Events.GET_STRUCTURE:
          subTitle.setText("Obtendo informações das tabelas no banco!");
          break;
        case Events.CREATE_STRUCTURE:
          subTitle.setText("Criando estrutura de tabelas de historiamento.");
          break;
        case Events.CREATE_SQL:
          subTitle.setText("Gerando SQL das tabelas de historiamento.");
          break;
        case Events.RUN_SQL:
          subTitle.setText("Executando SQL");
          break;
        case Events.RUNNING_TRIGGERS:
          subTitle.setText("Executando Triggers  de historiamento.");
          break;
        case Events.FINISH:
          subTitle.setText("Sucesso as tabelas e as triggers foram criadas!");
          progressBar.hide();
          backButton.show();
          break;
        case Events.ERROR:
          subTitle.setText("Ocorreu um erro, veja seu terminal!");
          progressBar.hide();
          break;
      }
    });
  }

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(backButton);
  start(connection);

  win.setCentralWidget(centralWidget);
}
