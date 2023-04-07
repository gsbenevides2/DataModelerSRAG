import { QFileDialog, FileMode, AcceptMode } from "@nodegui/nodegui";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createButton,
} from "../helpers/uiHelpers";
import OracleDB from "oracledb";
import { fourthPage } from "./fourthPage";

export function thirdPage(connection: OracleDB.Connection) {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const title = createTitle("Vamos Continuar!");

  const subTitle = createTextLabel("Você já possui um arquivo de carga?");

  const buttonFile = createButton("Selecionar Arquivo");

  const fileDialog = new QFileDialog();
  fileDialog.setFileMode(FileMode.ExistingFile);
  fileDialog.setNameFilter("Arquivos de Carga (*.csv)");
  fileDialog.setAcceptMode(AcceptMode.AcceptOpen);

  const statusLabel = createTextLabel("");

  buttonFile.addEventListener("clicked", () => {
    fileDialog.exec();
  });

  fileDialog.addEventListener("fileSelected", (fileName: string) => {
    buttonFile.setDisabled(true);
    statusLabel.setText("Estamos processando o arquivo de carga.");
    console.log(fileName);
    statusLabel.setText("Arquivo de carga processado.");
    buttonFile.setDisabled(false);
    fourthPage(connection, fileName);
  });

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(buttonFile);
  rootLayout.addWidget(statusLabel);

  win.setCentralWidget(centralWidget);
}
