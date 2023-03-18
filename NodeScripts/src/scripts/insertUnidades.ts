import path from "path";
import { connectToDatabase } from "../helpers/connectToDatabase";
import { readCSVFile } from "../helpers/readCSVFile";

type UniCSV = {
  NOME: string;
  COD: string;
  MUN: string;
};
const unidadesCSVPath = path.resolve(process.cwd(), "data", "unidades.csv");

import cliProgress from "cli-progress";
import { countLines } from "../helpers/countLines";

const insertUnidades = async () => {
  const connection = await connectToDatabase();
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  console.log("Inserting unidades...");

  progressBar.start(await countLines(unidadesCSVPath), 0);

  await readCSVFile<UniCSV>(unidadesCSVPath, async (row, index) => {
    const { NOME, COD, MUN } = row;

    type City = {
      MUN_ID: number;
    };
    const cityId = await connection.execute<City>(
      `SELECT mun_id FROM MUNICIPIOS WHERE mun_cod_ibge = :mun_cod_ibge`,
      [MUN]
    );

    if (cityId.rows?.length == null) {
      console.log("City not found:", MUN);
      process.exit(1);
    }
    const { MUN_ID } = cityId.rows[0];
    try {
      await connection.execute(
        `INSERT INTO UNIDADES (uni_cod_cnes, uni_nome, uni_mun_id) 
         VALUES(:uni_cod_cnes, :uni_nome, :uni_mun_id)`,
        [COD, NOME, MUN_ID]
      );
    } catch (e) {
      console.log("Error on line", index, ":", row);
      console.log("Error:", e);
      process.exit(1);
    }
    progressBar.update(index);
  });
  progressBar.stop();
  await connection.commit();
  await connection.close();
  console.log("Done inserting unidades.");
};

insertUnidades();
