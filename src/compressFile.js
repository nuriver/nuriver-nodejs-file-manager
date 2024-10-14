import path from "path";
import { promisify } from "util";
import fs from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream";

export const compressFile = async (filePath, destPath) => {
  const fileName = path.basename(filePath);
  const archiveName = fileName + ".gz";
  const archivePath = path.join(destPath, archiveName);

  const pipe = promisify(pipeline);
  const gzip = createGzip();

  const sourceReadable = fs.createReadStream(filePath);
  const destWritable = fs.createWriteStream(archivePath);

  await pipe(sourceReadable, gzip, destWritable);
  console.log(`File was compressed in ${destPath}`)
};
