import { QMainWindow } from "@nodegui/nodegui";
import { firstPage } from "./pages/firstPage";

const win = new QMainWindow();
win.setWindowTitle("Carga de Banco");
win.resize(700, 500);
win.show();

declare global {
  var win: QMainWindow;
}

global.win = win;
firstPage();
