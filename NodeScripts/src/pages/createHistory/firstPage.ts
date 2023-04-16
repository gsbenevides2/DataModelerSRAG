import { connectToDatabase } from "../../helpers/connectToDatabase";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createTextEditor,
  createButton,
  createInderteminateProgressBar,
} from "../../helpers/uiHelpers";
import { secondPage } from "./secondPage";

export function createHistoryFirstPage(): void {
  win.setWindowTitle("Ajudante de Historiamento de Banco Oracle - SRAG");

  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();
  const title = createTitle("Olá seja bem vindo.");
  const subTitle = createTextLabel(
    "Precisamos de algumas informações para continuar. Já preenchemos as informaçõs com o usuário APP padrão mas você pode alterar se quiser."
  );
  const textEditUser = createTextEditor("Usuário do Banco:");
  const textEditPassword = createTextEditor("Senha do Banco:");
  const textEditConnectionString = createTextEditor(
    "String de Conexão do Banco:"
  );
  const statusLabel = createTextLabel("");
  const nextButton = createButton("Próximo");
  const progressBar = createInderteminateProgressBar();

  textEditUser.setText("APP");
  textEditPassword.setText("APP123");
  textEditConnectionString.setText("localhost:1521/xe");
  progressBar.setVisible(false);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  nextButton.addEventListener("clicked", async () => {
    progressBar.setVisible(true);
    nextButton.setDisabled(true);

    const user = textEditUser.text();
    const password = textEditPassword.text();
    const connectionString = textEditConnectionString.text();

    if (
      user.length === 0 ||
      password.length === 0 ||
      connectionString.length === 0
    ) {
      statusLabel.setText("Preencha todos os campos.");
      nextButton.setDisabled(false);
      progressBar.setVisible(false);
      return;
    }

    statusLabel.setText("Conectando ao banco de dados...");
    try {
      const connection = await connectToDatabase(
        user,
        password,
        connectionString
      );
      statusLabel.setText("Conectado ao banco de dados.");
      void secondPage(connection);
    } catch (err) {
      statusLabel.setText(
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        "Erro ao conectar ao banco de dados.\nDetalhes: " + err
      );
    } finally {
      progressBar.setVisible(false);
      nextButton.setDisabled(false);
    }
  });

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(textEditUser);
  rootLayout.addWidget(textEditPassword);
  rootLayout.addWidget(textEditConnectionString);
  rootLayout.addWidget(nextButton);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);

  win.setCentralWidget(centralWidget);
}
