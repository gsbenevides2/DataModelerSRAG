import { connectToDatabase } from "../helpers/connectToDatabase";
import {
  createCentralWidgetAndLayout,
  createTitle,
  createTextLabel,
  createTextEditor,
  createButton,
  createInderteminateProgressBar,
} from "../helpers/uiHelpers";
import { secondPage } from "./secondPage";

export function firstPage() {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const title = createTitle("Olá seja bem vindo.");
  const subTitle = createTextLabel(
    "Precisamos de algumas informações para continuar."
  );
  const textEditUser = createTextEditor("Usuário do Banco:");
  const textEditPassword = createTextEditor("Senha do Banco:");
  const textEditConnectionString = createTextEditor(
    "String de Conexão do Banco:"
  );
  textEditConnectionString.setText("localhost:1521/xe");
  const statusLabel = createTextLabel("");
  const nextButton = createButton("Próximo");
  const progressBar = createInderteminateProgressBar();

  nextButton.addEventListener("clicked", async () => {
    progressBar.setVisible(true);
    nextButton.setDisabled(true);

    const user = textEditUser.text();
    const password = textEditPassword.text();
    const connectionString = textEditConnectionString.text();

    if (!user || !password || !connectionString) {
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
      secondPage(connection, connectionString);
    } catch (err) {
      statusLabel.setText(
        "Erro ao conectar ao banco de dados.\nDetalhes: " + err
      );
    } finally {
      progressBar.setVisible(false);
      nextButton.setDisabled(false);
    }
  });

  progressBar.setVisible(false);

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
