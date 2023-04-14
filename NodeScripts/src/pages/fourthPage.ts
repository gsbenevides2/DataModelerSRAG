import type OracleDB from "oracledb";
import {
  createButton,
  createCentralWidgetAndLayout,
  createProgressBar,
  createTextLabel,
  createTitle,
} from "../helpers/uiHelpers";
import { readCSVFile } from "../helpers/readCSVFile";
import { handleError, insertLine } from "../scripts/casos";
import { type SuportedYears, type Columns } from "../scripts/casos/types";
import path from "path";

export function fourthPage(
  connection: OracleDB.Connection,
  filePath: string,
  year: SuportedYears
): void {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const fileName = path.basename(filePath);

  const title = createTitle("Agora é a Hora!");

  const subTitle = createTextLabel("Você deseja realizar a carga de dados?");

  const buttonFile = createButton("Sim");

  const progressBar = createProgressBar();
  progressBar.setMaximum(100);

  const statusLabel = createTextLabel("");
  // const lastLineTime = new Date().getTime();

  async function buttonClicked(): Promise<void> {
    buttonFile.setDisabled(true);
    statusLabel.setText("Processando quantidade de linhas do arquivo!");
    statusLabel.setMinimumHeight(200);
    progressBar.setRange(0, 0);

    let allLinesCounted = false;
    let lineOkCounted = 0;
    let errorsCounted = 0;
    let allLinesCount = 0;
    const startedTime = new Date().getTime();
    let progressBarValue = "0";

    function setStatusLabel(): void {
      const timeSpent = Math.floor((new Date().getTime() - startedTime) / 1000);
      const linesCounted = lineOkCounted + errorsCounted;

      const totalPorcentage = ((linesCounted / allLinesCount) * 100).toFixed(2);
      const lineOkPercentage = ((lineOkCounted / allLinesCount) * 100).toFixed(
        2
      );
      const errorsPercentage = ((errorsCounted / allLinesCount) * 100).toFixed(
        2
      );

      const newProgressBarValue = (
        (lineOkCounted / allLinesCount) *
        100
      ).toFixed(0);
      if (progressBarValue !== newProgressBarValue) {
        progressBarValue = newProgressBarValue;
        progressBar.setValue(parseInt(progressBarValue));
      }

      if (totalPorcentage === "100.00") {
        statusLabel.setText(
          `Arquivo: ${fileName} - Ano: ${year}
Foram processados ${linesCounted}(${totalPorcentage}%) linhas do arquivo CSV.
${lineOkCounted}(${lineOkPercentage}%) linhas foram processadas sem problemas.
${errorsCounted}(${errorsPercentage}%) linhas não foram processadas pois ocorreu alguma falha(Veja pasta errors, com os relatórios).
O processo durou ${timeSpent} segundos.`
        );
      } else {
        statusLabel.setText(
          `Arquivo: ${fileName} - Ano: ${year}
Já foram processados ${linesCounted}/${allLinesCount}(${totalPorcentage}%) linhas do arquivo CSV.
${lineOkCounted}(${lineOkPercentage}%) linhas foram processadas sem problemas.
${errorsCounted}(${errorsPercentage}%) linhas não foram processadas pois ocorreu alguma falha(Veja pasta errors, com os relatórios).
Já se passaram ${timeSpent} segundos.`
        );
      }
    }

    await readCSVFile<Columns>(
      filePath,
      async (row, index, length, pureRow) => {
        if (!allLinesCounted) {
          allLinesCounted = true;
          allLinesCount = length;
          progressBar.setRange(0, 100);
        }
        try {
          await insertLine(row, connection, year);
          lineOkCounted++;
        } catch (e: any) {
          errorsCounted++;
          await handleError(e, connection, row, index, pureRow, year);
        } finally {
          setStatusLabel();
        }
      },
      {
        delimiter: ";",
        encoding: "utf8",
      }
    );

    buttonFile.hide();
    progressBar.hide();
    await connection.close();
    title.setText("Upload de dados finalizados!");
    subTitle.setText("Fim você pode fechar essa janela!");
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  buttonFile.addEventListener("clicked", buttonClicked);

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(buttonFile);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);

  win.setCentralWidget(centralWidget);
}
