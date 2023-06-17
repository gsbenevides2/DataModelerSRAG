import type OracleDB from "oracledb";
import {
  createButton,
  createCentralWidgetAndLayout,
  createInderteminateProgressBar,
  createTextLabel,
  createTitle,
} from "../../helpers/uiHelpers";
import enableAudit, { Status } from "../../scripts/enableAudit";
import { homePage } from "../homePage";

export function secondPage(
  connection: OracleDB.Connection,
  connectionString: string
): void {
  win.setWindowTitle("Ativar auditoria de Banco Oracle - SRAG");
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Olá seja bem vindo.");
  const subTitle = createTextLabel("Progresso de ativação da auditoria:");

  const progressBar = createInderteminateProgressBar();

  const statusLabel = createTextLabel("");
  const returnButton = createButton("Voltar ao menu principal");
  returnButton.setVisible(false);

  enableAudit(
    connection,
    connectionString,
    (status: Status, message: string) => {
      switch (status) {
        case Status.RUNNING:
          statusLabel.setText(message);
          break;
        default:
          statusLabel.setText(message);
          returnButton.setVisible(true);
          progressBar.setVisible(false);
          break;
      }
    }
  );

  returnButton.addEventListener("clicked", homePage);

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);
  rootLayout.addWidget(returnButton);

  win.setCentralWidget(centralWidget);
}
