import type OracleDB from "oracledb";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createInderteminateProgressBar,
  createButton,
} from "../../helpers/uiHelpers";

import { homePage } from "../homePage";
import { moveDataToHistory } from "../../scripts/moveDataToHistory";

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

  async function start(connection: OracleDB.Connection): Promise<void> {
    try {
      subTitle.setText("Movendo os dados...");
      await moveDataToHistory(connection);
      progressBar.hide();
      backButton.show();
      subTitle.setText("Sucesso os dados foram movidos!");
    } catch (err) {
      subTitle.setText(`Ocorreu um erro, veja seu terminal!\n${String(err)}`);
      console.error(err);
    }
  }

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(backButton);
  start(connection);

  win.setCentralWidget(centralWidget);
}
