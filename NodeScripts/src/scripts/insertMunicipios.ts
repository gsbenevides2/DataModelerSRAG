import path from "path";
import { connectToDatabase } from "../helpers/connectToDatabase";
import { readCSVFile } from "../helpers/readCSVFile";

type MunCSV = {
  UF: string;
  IBGE: string;
  NOME: string;
};
const municipiosCSVPath = path.resolve(process.cwd(), "data", "municipios.csv");

import cliProgress from "cli-progress";
import { countLines } from "../helpers/countLines";

const insertMunicipios = async () => {
  const connection = await connectToDatabase();
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  console.log("Inserting municipios...");

  progressBar.start(await countLines(municipiosCSVPath), 0);

  await readCSVFile<MunCSV>(municipiosCSVPath, async (row, index) => {
    const { UF, IBGE, NOME } = row;

    type State = {
      EST_ID: number;
    };
    const stateId = await connection.execute<State>(
      `SELECT est_id FROM ESTADOS WHERE est_nome = :est_nome`,
      [UF]
    );

    if (stateId.rows?.length == null) {
      console.log("State not found:", UF);
      process.exit(1);
    }
    const { EST_ID } = stateId.rows[0];
    try {
      await connection.execute(
        `INSERT INTO MUNICIPIOS(mun_cod_ibge, mun_nome, mun_est_id) 
      VALUES(:mun_cod_ibge, :mun_nome, :mun_est_id)`,
        [IBGE, NOME, EST_ID]
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
  console.log("Done inserting municipios.");
};

insertMunicipios();
