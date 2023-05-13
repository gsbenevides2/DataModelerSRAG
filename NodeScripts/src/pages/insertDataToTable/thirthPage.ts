import type OracleDB from "oracledb";
import {
    createButton,
    createCentralWidgetAndLayout,
    createProgressBar,
    createTextLabel,
    createTitle,
} from "../../helpers/uiHelpers";
import {readCSVFile} from "../../helpers/readCSVFile";
import {handleError, insertLine} from "../../scripts/runDML/casos";
import {type SuportedYears, type Columns} from "../../scripts/runDML/types";
import path from "path";
import {homePage} from "../homePage";


class ThirthPage {
    connection: OracleDB.Connection;
    filePath: string;
    year: SuportedYears;
    title = createTitle("Agora é a Hora!");
    subTitle = createTextLabel("Você deseja realizar a carga de dados?");
    buttonFile = createButton("Sim");
    progressBar = createProgressBar();
    statusLabel = createTextLabel("");
    fileName: string
    backButton = createButton("Voltar à Tela Inicial");

    constructor(connection: OracleDB.Connection, filePath: string, year: SuportedYears) {
        this.connection = connection;
        this.filePath = filePath;
        this.fileName = path.basename(filePath);
        this.year = year;
    }

    makePage(): void {
        const {centralWidget, rootLayout} = createCentralWidgetAndLayout();


        this.progressBar.setMaximum(100);
        this.backButton.hide();

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.buttonFile.addEventListener("clicked", () => {
            void this.buttonClicked();
        });
        this.backButton.addEventListener("clicked", homePage);

        rootLayout.addWidget(this.title);
        rootLayout.addWidget(this.subTitle);
        rootLayout.addWidget(this.buttonFile);
        rootLayout.addWidget(this.progressBar);
        rootLayout.addWidget(this.statusLabel);
        rootLayout.addWidget(this.backButton);

        win.setCentralWidget(centralWidget);
    }

    startedTime = 0;

    async buttonClicked(): Promise<void> {
        this.buttonFile.setDisabled(true);
        this.statusLabel.setText("Processando quantidade de linhas do arquivo!");
        this.statusLabel.setMinimumHeight(200);
        this.progressBar.setRange(0, 0);
        this.startedTime = new Date().getTime();


        await readCSVFile<Columns>(
            this.filePath,
            async (row: Columns, index: number, length: number, pureRow: string) => {
                await this.receiveLine(row, index, length, pureRow);
            }
        )
    }

    lineInMemory = 0;
    maxLinesInMemory = 10;
    length = 0;
    linesCounted = 0;
    linesOK = 0;
    linesError = 0;

    async receiveLine(row: Columns, index: number, length: number, pureRow: string): Promise<void> {

        if (this.length === 0) {
            this.length = length;
            this.progressBar.setRange(0, 100);
        }

        try {
            await insertLine(row, this.connection, this.year)
            this.linesOK++
        } catch (e) {
            this.linesError++
            await  handleError(e, this.connection, row, index, pureRow, this.year)
        } finally {
            this.linesCounted++
            await  this.updateStatusLabel()
        }
    }

    progressBarValue = "0";

    async updateStatusLabel(): Promise<void> {
        const timeSpent = Math.floor((new Date().getTime() - this.startedTime) / 1000);

        const totalPorcentage = ((this.linesCounted / this.length) * 100).toFixed(2);
        const lineOkPercentageNumber = ((this.linesOK / this.length) * 100)
        const lineOkPercentage = lineOkPercentageNumber.toFixed(2);
        const errorsPercentage = ((this.linesError / this.length) * 100).toFixed(
            2
        );

        const newProgressBarValue = lineOkPercentageNumber.toFixed(0);
        if (this.progressBarValue !== newProgressBarValue) {
            this.progressBarValue = newProgressBarValue;
            this.progressBar.setValue(parseInt(this.progressBarValue));
        }

        if (totalPorcentage === "100.00") {
            this.statusLabel.setText(
                `Arquivo: ${this.fileName} - Ano: ${this.year}\n` +
                `Foram processados ${this.linesCounted}(${totalPorcentage}%) linhas do arquivo CSV.\n` +
                `${this.linesOK}(${lineOkPercentage}%) linhas foram processadas sem problemas.\n` +
                `${this.linesError}(${errorsPercentage}%) linhas não foram processadas pois ocorreu alguma falha(Veja pasta errors, com os relatórios).\n` +
                `O processo durou ${timeSpent} segundos.`
            );

            this.buttonFile.hide();
            this.progressBar.hide();
            await this.connection.close();
            this.title.setText("Upload de dados finalizados!");
            this.subTitle.setText("Fim você pode fechar essa janela!");
            this.backButton.show();


        } else {
            this.statusLabel.setText(
                `Arquivo: ${this.fileName} - Ano: ${this.year}\n` +
                `Já foram processados ${this.linesCounted}(${totalPorcentage}%) linhas do arquivo CSV.\n` +
                `${this.linesOK}(${lineOkPercentage}%) linhas foram processadas sem problemas.\n` +
                `${this.linesError}(${errorsPercentage}%) linhas não foram processadas pois ocorreu alguma falha(Veja pasta errors, com os relatórios).\n` +
                `Já se passaram ${timeSpent} segundos.`
            );
        }

    }

}


export function thirthPage(
    connection: OracleDB.Connection,
    filePath: string,
    year: SuportedYears
): void {
    const page = new ThirthPage(connection, filePath, year);
    page.makePage();
}
