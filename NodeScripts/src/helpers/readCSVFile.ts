import { parse } from "csv/sync";
import fs from "fs";
import readline from "readline";
import { countLines } from "./countLines";

export async function readCSVFile<T>(
  filePath: string,
  onLine: (
    row: T,
    index: number,
    length: number,
    pure: string
  ) => Promise<void>,
  options: { encoding?: BufferEncoding; delimiter?: string } = {}
): Promise<void> {
  let headers: Array<keyof T> = [];
  let lineCount = 1;
  const allLinesCount = (await countLines(filePath)) - 1;
  const { encoding = "utf8", delimiter = ";" } = options;

  const readlineInterface = readline.createInterface({
    input: fs.createReadStream(filePath, { encoding }),
    crlfDelay: Infinity,
  });

  for await (const line of readlineInterface) {
    const row = parse(line, { delimiter })[0];
    if (lineCount === 1) {
      headers = row;
    } else if (row.length !== headers.length) {
      console.log("Error on line", lineCount, ":", row);
      console.log(
        "Line length:",
        row.length,
        "Headers length:",
        headers.length
      );
      console.log("Headers:", headers);
      console.log("Row:", row);
      console.log("Pure line:", line);
      process.exit(1);
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const emptyObj = {} as T;
      const obj = headers.reduce<T>((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, emptyObj);
      await onLine(obj, lineCount, allLinesCount, line);
    }
    lineCount++;
  }
  readlineInterface.close();
}
