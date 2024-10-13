import fs from "fs";

export const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(filePath, "utf-8");
    readableStream.on("data", (data) => {
      process.stdout.write(`${data}\n`);
    });
    readableStream.on("end", () => {
      resolve(); 
    });

    readableStream.on("error", (err) => {
      reject(err); 
    });
  });
};
