import type OracleDB from "oracledb";
import {
  createButton,
  createCentralWidgetAndLayout,
  createInderteminateProgressBar,
  createTextLabel,
  createTitle,
} from "../../helpers/uiHelpers";
import { createStage } from "../../scripts/createStage";
import { homePage } from "../homePage";

export function secondPage(
  connection: OracleDB.Connection
): void {
  win.setWindowTitle("Criar stage de Banco Oracle - SRAG");
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Olá seja bem vindo.");
  const subTitle = createTextLabel("Progresso de criação de stage:");

  const progressBar = createInderteminateProgressBar();

  const statusLabel = createTextLabel("Criando stage...");
  const returnButton = createButton("Voltar ao menu principal");
  returnButton.setVisible(false);

  createStage(connection).then(()=>{
    statusLabel.setText("Stage criada com sucesso!");
    returnButton.setVisible(true);
    progressBar.setVisible(false);
  }).catch((err)=>{
    statusLabel.setText(err);
    returnButton.setVisible(true);
    progressBar.setVisible(false);
  });
      
  returnButton.addEventListener("clicked", homePage);

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);
  rootLayout.addWidget(returnButton);

  win.setCentralWidget(centralWidget);
}
