import { QMainWindow } from "@nodegui/nodegui";
import { homePage } from "./pages/homePage";

const win = new QMainWindow();

win.resize(700, 500);
win.show();

declare global {
  // eslint-disable-next-line no-var
  var win: QMainWindow;
}

global.win = win;
homePage();
