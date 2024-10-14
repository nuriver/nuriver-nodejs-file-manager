import fs from "fs";
import { createHash } from "crypto";

export const calculateHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(filePath);
    const hash = createHash("sha256");

    readableStream.pipe(hash).setEncoding("hex").pipe(process.stdout);
    readableStream.on("end", () => {
      process.stdout.write("\n");
      resolve();
    });
    readableStream.on("error", () => {
      reject();
    });
  });
};
