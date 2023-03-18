import path from "path";
import { connectToDatabase } from "../../helpers/connectToDatabase";
import { parseDateStringToDateObject } from "../../helpers/parseDateStingToDate";
import { readCSVFile } from "../../helpers/readCSVFile";
import { getMunicipioId } from "./getMunicipioId";
import { getUnidadeId } from "./getUnidadeId";
import { insertCaso } from "./insertCaso";

async function main() {
  const connection = await connectToDatabase();
  let actualLine = 0;
  const filePath = path.resolve(
    process.cwd(),
    "data",
    "Dataset Filtrado - 2021.csv"
  );
  await readCSVFile<Columns>(
    filePath,
    async (row) => {
      const dataNotificacao = parseDateStringToDateObject(row.DT_NOTIFIC);
      const dataPrimeirosSintomas = parseDateStringToDateObject(row.DT_SIN_PRI);
      const unidadeId = await getUnidadeId(connection, row.CO_UNI_NOT);
      const estrangeiro = row.ESTRANG === "1" ? 1 : 0;
      let genId: number = 9;
      if (row.CS_SEXO === "M") genId = 1;
      else if (row.CS_SEXO === "F") genId = 2;
      const dataNascimento = parseDateStringToDateObject(row.DT_NASC);
      const idadeGestacional = row.CS_GESTANT ? Number(row.CS_GESTANT) : 6;
      const racaCor = row.CS_RACA ? Number(row.CS_RACA) : 9;
      const escolaridade = row.CS_ESCOL_N ? Number(row.CS_ESCOL_N) : 9;
      const municipioId = await getMunicipioId(connection, row.CO_MUN_RES);
      const zona = row.CS_ZONA ? Number(row.CS_ZONA) : 9;
      let nosocomial: number | null = null;
      if (row.NOSOCOMIAL === "1") nosocomial = 1;
      else if (row.NOSOCOMIAL === "0") nosocomial = 0;
      const suporteVentilatorio = row.SUPORT_VEN ? Number(row.SUPORT_VEN) : 9;
      const classificacaoFinal = row.CLASSI_FIN ? Number(row.CLASSI_FIN) : 4;
      const dataDigitacao = parseDateStringToDateObject(row.DT_DIGITA);

      const casId = await insertCaso(connection, {
        dataNotificacao,
        dataPrimeirosSintomas,
        unidadeId,
        estrangeiro,
        genId,
        dataNascimento,
        idadeGestacional,
        racaCor,
        escolaridade,
        municipioId,
        zona,
        nosocomial,
        suporteVentilatorio,
        classificacaoFinal,
        dataDigitacao,
      });

      connection.commit();

      console.log(casId);

      actualLine++;

      if (actualLine == 100) {
        process.exit();
      }
    },
    {
      delimiter: ";",
      encoding: "utf8",
    }
  );
}

main();
