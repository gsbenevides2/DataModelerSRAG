import {
  createButton,
  createTitle,
  createCentralWidgetAndLayout,
  createTextLabel,
} from "../helpers/uiHelpers";
import { createBasicTableFirstPage } from "./createBasicTable/firstPage";
import { createHistoryFirstPage } from "./createHistory/firstPage";
import { createStageFirstPage } from "./createStage/firstPage";
import { enableAuditFirstPage } from "./enableAudit/firstPage";
import { insertDataToTableFirstPage } from "./insertDataToTable/firstPage";
import { moveDataToHistoryFirstPage } from "./moveDataToHistory/firstPage";

const buttons = [
  {
    text: "Preparar um banco Oracle com a DDL e DML de metadados",
    action: createBasicTableFirstPage,
  },
  {
    text: "Subir um arquivo CSV ao um banco Oracle já preparado",
    action: insertDataToTableFirstPage,
  },
  {
    text: "Criar tabelas e triggers de historiamento de banco",
    action: createHistoryFirstPage,
  },
  {
    text: "Mover para o histórico",
    action: moveDataToHistoryFirstPage,
  },
  {
    text: "Ativar auditoria",
    action: enableAuditFirstPage,
  },
  {
    text: "Criar View de Stage",
    action: createStageFirstPage,
  },
];

export function homePage(): void {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const title = createTitle("Sejá muito bem vindo!");
  const subTitle = createTextLabel("Vamos lá! Qual opção você deseja?");

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);

  for (const button of buttons) {
    const buttonOption = createButton(button.text);
    if (button.action != null)
      buttonOption.addEventListener("clicked", button.action);
    rootLayout.addWidget(buttonOption);
  }

  win.setWindowTitle("Auxiliar de Banco - SRAG");
  win.setCentralWidget(centralWidget);
}
