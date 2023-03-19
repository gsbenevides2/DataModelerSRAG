import path from "path";
import { connectToDatabase } from "../../helpers/connectToDatabase";

import { readCSVFile } from "../../helpers/readCSVFile";
import { insertCaso } from "./insertCaso";
import { insertEvolucoes } from "./insertEvolucoes";
import { insertRaioX } from "./insertRaioX";
import { insertTomografias } from "./insertTomografias";
import { insertVacinaGripe } from "./insertVacinaGripe";

async function main() {
  const connection = await connectToDatabase();

  await connection.execute("ALTER SESSION SET NLS_DATE_FORMAT = 'DD/MM/YYYY'");

  let actualLine = 0;
  const filePath = path.resolve(
    process.cwd(),
    "data",
    "Dataset Filtrado - 2021.csv"
  );
  await readCSVFile<Columns>(
    filePath,
    async (row) => {
      const casId = await insertCaso(connection, row);

      await insertRaioX(connection, row, casId);
      await insertEvolucoes(connection, row, casId);
      await insertTomografias(connection, row, casId);
      await insertVacinaGripe(connection, row, casId);

      await connection.commit();

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
