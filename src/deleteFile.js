import fs from "fs/promises";

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    throw new Error("File deletion failed");
  }
};
