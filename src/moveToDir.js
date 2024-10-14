import path from "path";

export function moveToDir(currentDir, newPathInput) {
  const newPath = path.resolve(currentDir, newPathInput);
  try {
    process.chdir(newPath);
    return newPath;
  } catch (error) {
    console.log("Operation failed");
    return currentDir;
  }
}
