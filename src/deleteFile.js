import fs from 'fs';
import fsPromise from "fs/promises";

export const deleteFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw new Error("File deletion failed");
  });
}