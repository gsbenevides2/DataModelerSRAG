import OracleDB from "oracledb";
import {
  createButton,
  createCentralWidgetAndLayout,
  createProgressBar,
  createTextLabel,
  createTitle,
} from "../helpers/uiHelpers";
import { readCSVFile } from "../helpers/readCSVFile";
import { handleError, insertLine } from "../scripts/casos";

export function fourthPage(connection: OracleDB.Connection, filePath: string) {
  const { centralWidget, rootLayout } = createCentralWidgetAndLayout();

  const title = createTitle("Agora é a Hora!");

  const subTitle = createTextLabel("Você deseja realizar a carga de dados?");

  const buttonFile = createButton("Sim");

  const progressBar = createProgressBar();
  progressBar.setMaximum(100);

  const statusLabel = createTextLabel("");
  let lastLineTime = new Date().getTime();
  buttonFile.addEventListener("clicked", async () => {
    buttonFile.setDisabled(true);

    let allLinesCounted = false;
    let lineOkCounted = 0;
    let errorsCounted = 0;
    let allLinesCount = 0;
    let startedTime = new Date().getTime();
    let progressBarValue = "0";

    function setStatusLabel() {
      const lineOkPercentage = ((lineOkCounted / allLinesCount) * 100).toFixed(
        2
      );
      const errorsPercentage = ((errorsCounted / allLinesCount) * 100).toFixed(
        2
      );
      const linesQueued = allLinesCount - lineOkCounted - errorsCounted;
      const timeSpent = Math.floor((new Date().getTime() - startedTime) / 1000);

      const newProgressBarValue = (
        (lineOkCounted / allLinesCount) *
        100
      ).toFixed(0);
      if (progressBarValue !== newProgressBarValue) {
        progressBarValue = newProgressBarValue;
        progressBar.setValue(parseInt(progressBarValue));
      }

      statusLabel.setText(
        `${lineOkCounted} de ${allLinesCount} registros processados. ${lineOkPercentage}% Concluido! \nLinhas com falha: ${errorsCounted}. ${errorsPercentage}% de falha.\nJá se passaram ${timeSpent} segundos.`
      );
    }

    await readCSVFile<Columns>(
      filePath,
      async (row, index, length, pureRow) => {
        if (!allLinesCounted) {
          allLinesCounted = true;
          allLinesCount = length;
        }
        try {
          await insertLine(row, connection);
          lineOkCounted++;
        } catch (e: any) {
          errorsCounted++;
          await handleError(e, connection, row, index, pureRow);
        } finally {
          setStatusLabel();
        }
      },
      {
        delimiter: ";",
        encoding: "utf8",
      }
    );
  });

  rootLayout.addWidget(title);
  rootLayout.addWidget(subTitle);
  rootLayout.addWidget(buttonFile);
  rootLayout.addWidget(progressBar);
  rootLayout.addWidget(statusLabel);

  win.setCentralWidget(centralWidget);
}
