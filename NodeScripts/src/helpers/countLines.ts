import fs from "fs";
import events from "events";

export async function countLines(filePath: string) {
  let lineCount = 0;
  let i;
  let stream = fs.createReadStream(filePath);
  stream = stream.on("data", (chunk) => {
    for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) lineCount++;
  });
  //await events.once(stream, "close");
  await events.once(stream, "end");
  stream.close();
  return lineCount;
}
