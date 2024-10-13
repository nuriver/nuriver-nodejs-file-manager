import fs from "fs/promises";
import path from "path";

export const printDirContent = async (dir) => {
  const dirContent = [];
  try {
    const files = await fs.readdir(dir);
    const dirContentPromises = files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      return {
        name: file,
        type: stats.isDirectory() ? "directory" : "file",
      };
  
    });
    const dirContent = await Promise.all(dirContentPromises);
    dirContent.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      } else {
        return a.type === "directory" ? -1 : 1;
      }
    });
    return dirContent;
  } catch (err) {
    throw new Error();
  }
};
