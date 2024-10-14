import path from "path";
import fs from "fs/promises";

export const renameFile = async (pathToFile, newName) => {
  const dirName = path.dirname(pathToFile);
  const pathToRenamedFile = path.join(dirName, newName);

  await fs.rename(pathToFile, pathToRenamedFile);
  console.log(`File was renamed`);
};
