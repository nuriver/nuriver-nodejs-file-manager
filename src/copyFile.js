import path from 'path';
import fs from 'fs';

export const copyFile = async (filePath, destDir) => {
  const fileName = path.basename(filePath);
  const newFilePath = path.join(destDir, fileName);
  const readableStream = fs.createReadStream(filePath);
  const writableStream = fs.createWriteStream(newFilePath)

  return new Promise((resolve, reject) => {
    readableStream.pipe(writableStream);
    
    writableStream.on("finish", () => {
      resolve();
    });

    writableStream.on("error", () => {
      reject();
    });

     readableStream.on("error", () => {
       reject();
     });
  })
}