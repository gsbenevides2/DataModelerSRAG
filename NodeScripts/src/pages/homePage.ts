import {
  createButton,
  createTitle,
  createCentralWidgetAndLayout,
  createTextLabel,
} from "../helpers/uiHelpers";
import { createBasicTableFirstPage } from "./createBasicTable/firstPage";
import { createHistoryFirstPage } from "./createHistory/firstPage";
import { insertDataToTableFirstPage } from "./insertDataToTable/firstPage";
import { moveDataToHistoryFirstPage } from "./moveDataToHistory/firstPage";

export function homePage(): void {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const title = createTitle("Sejá muito bem vindo!");
  const subTitle = createTextLabel("Vamos lá! Qual opção você deseja?");
  const buttonOption1 = createButton(
    "Preparar um banco Oracle com a DDL e DML de metadados"
  );
  const buttonOption2 = createButton(
    "Subir um arquivo CSV ao um banco Oracle já preparado"
  );
  const buttonOption3 = createButton(
    "Criar tabelas e triggers de historiamento de banco"
  );
  const buttonOption4 = createButton("Mover para o histórico");

  buttonOption1.addEventListener("clicked", createBasicTableFirstPage);
  buttonOption2.addEventListener("clicked", insertDataToTableFirstPage);
  buttonOption3.addEventListener("clicked", createHistoryFirstPage);
  buttonOption4.addEventListener("clicked", moveDataToHistoryFirstPage);

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(buttonOption1);
  rootLayout.addWidget(buttonOption2);
  rootLayout.addWidget(buttonOption3);
  rootLayout.addWidget(buttonOption4);

  win.setWindowTitle("Auxiliar de Banco - SRAG");
  win.setCentralWidget(centralWidget);
}
