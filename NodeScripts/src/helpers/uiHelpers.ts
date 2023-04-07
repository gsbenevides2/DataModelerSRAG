import {
  AlignmentFlag,
  FlexLayout,
  QLabel,
  QLineEdit,
  QProgressBar,
  QPushButton,
  QWidget,
} from "@nodegui/nodegui";

export function createTextLabel(text: string) {
  const label = new QLabel();
  label.setText(text);
  label.setInlineStyle(
    "font-size: 14px; font-weight: bold; padding-top:8px; margin-horizontal:4px;"
  );
  label.setWordWrap(true);
  return label;
}
export function createTextEditor(placeholder: string) {
  const textEdit = new QLineEdit();
  textEdit.setInlineStyle(
    "font-size: 14px; font-weight: bold; margin-horizontal:8px; padding-vertical: 8px;"
  );
  textEdit.setPlaceholderText(placeholder);
  return textEdit;
}
export function createTitle(text: string) {
  const title = new QLabel();
  title.setText(text);
  title.setInlineStyle("font-size: 16px; font-weight: bold; padding-top:8px;");
  title.setAlignment(AlignmentFlag.AlignCenter);
  return title;
}
export function createButton(text: string) {
  const button = new QPushButton();
  button.setText(text);
  button.setInlineStyle(
    "font-size: 14px; font-weight: bold; margin-horizontal:8px; padding-vertical: 8px;"
  );
  return button;
}
export function createCentralWidgetAndLayout() {
  const centralWidget = new QWidget();
  centralWidget.setObjectName("myroot");
  const rootLayout = new FlexLayout();
  centralWidget.setLayout(rootLayout);
  return { centralWidget, rootLayout };
}
export function createProgressBar() {
  const progressBar = new QProgressBar();
  progressBar.setInlineStyle(
    "font-size: 14px; font-weight: bold; margin-horizontal:8px;"
  );
  return progressBar;
}
export function createInderteminateProgressBar() {
  const progressBar = createProgressBar();
  progressBar.setRange(0, 0);
  return progressBar;
}
