import fs from 'fs/promises'

export const isPathExist = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};
