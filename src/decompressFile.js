import { promisify } from "util";
import path from "path";
import fs from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream";

export const decompressFile = async (archivePath, destPath) => {
  const decompressedFileName = path.basename(archivePath, ".gz");
  const decompressedFilePath = path.join(destPath, decompressedFileName);

  const pipe = promisify(pipeline);
  const gunzip = createGunzip();
  const archiveReadable = fs.createReadStream(archivePath);
  const decompressedFileWritable = fs.createWriteStream(decompressedFilePath);

  await pipe(archiveReadable, gunzip, decompressedFileWritable);
};
