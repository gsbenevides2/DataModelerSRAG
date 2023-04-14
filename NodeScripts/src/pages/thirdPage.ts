import { QFileDialog, FileMode, AcceptMode, QComboBox } from "@nodegui/nodegui";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createButton,
} from "../helpers/uiHelpers";
import type OracleDB from "oracledb";
import { fourthPage } from "./fourthPage";
import { type SuportedYears, suportedYears } from "../scripts/casos/types";

export function thirdPage(connection: OracleDB.Connection): void {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  let fileUrl: string = "";
  let selectedYear: SuportedYears = suportedYears[0];

  const title = createTitle("Vamos Continuar!");

  const subTitle = createTextLabel("Você já possui um arquivo de carga?");

  const selectFileButtonFile = createButton("Selecionar Arquivo");

  const continueButton = createButton("Continuar");
  continueButton.setEnabled(false);

  const fileDialog = new QFileDialog();
  fileDialog.setFileMode(FileMode.ExistingFile);
  fileDialog.setNameFilter("Arquivos de Carga (*.csv)");
  fileDialog.setAcceptMode(AcceptMode.AcceptOpen);

  const selectLabel = createTextLabel("Selecione o ano de referência:");

  const statusLabel = createTextLabel("");

  selectFileButtonFile.addEventListener("clicked", () => {
    fileDialog.exec();
  });

  const comboBox = new QComboBox();

  comboBox.addItems(suportedYears as unknown as string[]);

  comboBox.setInlineStyle(
    "font-size: 14px; font-weight: bold; margin-horizontal:8px;"
  );

  comboBox.addEventListener("currentTextChanged", (text: string) => {
    selectedYear = text as SuportedYears;
  });

  fileDialog.addEventListener("fileSelected", (fileName: string) => {
    fileUrl = fileName;
    statusLabel.setText(`Arquivo selecionado: ${fileName}`);
    continueButton.setEnabled(true);
  });

  continueButton.addEventListener("clicked", () => {
    fourthPage(connection, fileUrl, selectedYear);
  });

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(selectFileButtonFile);
  rootLayout.addWidget(statusLabel);
  rootLayout.addWidget(selectLabel);
  rootLayout.addWidget(comboBox);
  rootLayout.addWidget(continueButton);

  win.setCentralWidget(centralWidget);
}
