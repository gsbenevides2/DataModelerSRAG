import { FileMode, AcceptMode } from "@nodegui/nodegui";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createButton,
  createFileDialog,
  createComboBox,
} from "../../helpers/uiHelpers";
import type OracleDB from "oracledb";
import { thirthPage } from "./thirthPage";
import { type SuportedYears, suportedYears } from "../../scripts/runDML/types";

export function secondPage(connection: OracleDB.Connection): void {
  let fileUrl: string = "";
  let selectedYear: SuportedYears = suportedYears[0];

  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Vamos Continuar!");
  const subTitle = createTextLabel("Você já possui um arquivo de carga?");
  const selectFileButtonFile = createButton("Selecionar Arquivo");
  const continueButton = createButton("Continuar");
  const fileDialog = createFileDialog();
  const selectLabel = createTextLabel("Selecione o ano de referência:");
  const statusLabel = createTextLabel("");
  const comboBox = createComboBox(suportedYears as unknown as string[]);

  continueButton.setEnabled(false);

  fileDialog.setFileMode(FileMode.ExistingFile);
  fileDialog.setNameFilter("Arquivos de Carga (*.csv)");
  fileDialog.setAcceptMode(AcceptMode.AcceptOpen);

  comboBox.addEventListener("currentTextChanged", (text: string) => {
    selectedYear = text as SuportedYears;
  });
  fileDialog.addEventListener("fileSelected", (fileName: string) => {
    fileUrl = fileName;
    statusLabel.setText(`Arquivo selecionado: ${fileName}`);
    continueButton.setEnabled(true);
  });
  continueButton.addEventListener("clicked", () => {
    thirthPage(connection, fileUrl, selectedYear);
  });
  selectFileButtonFile.addEventListener("clicked", () => {
    fileDialog.exec();
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
