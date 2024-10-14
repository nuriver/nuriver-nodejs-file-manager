import path from "path";
import { stdin as input, stdout as output } from "process";
import readline from "node:readline/promises";
import { moveToDir } from "./moveToDir.js";
import { printDirContent } from "./printDirContent.js";
import { readFile } from "./readFile.js";
import { createFile } from "./createFile.js";
import { renameFile } from "./renameFile.js";
import { copyFile } from "./copyFile.js";
import { deleteFile } from "./deleteFile.js";
import { printOSInfo } from "./printOSInfo.js";
import { calculateHash } from "./calculateHash.js";
import { compressFile } from "./compressFile.js";

const cliStarter = async () => {
  let currentDir = process.cwd();
  const rl = readline.createInterface(input, output);
  let username = process.env.npm_config_username;

  if (username === undefined) {
    username = "Stranger";
  }

  rl.write(`Welcome to the File Manager, ${username}!\n`);
  rl.write(`You are currently in ${currentDir}\n`);
  rl.setPrompt("Enter a command: ");
  rl.prompt();
  rl.on("line", async (input) => {
    const trimmedInput = input.toString().trim();

    if (trimmedInput === ".exit") {
      rl.close();
      return;
    }
    const [command, ...args] = trimmedInput.split(" ");

    switch (command) {
      case "up":
        if (args.length > 0) {
          console.log("Invalid input");
        } else {
          currentDir = path.resolve(currentDir, "..");
          process.chdir(currentDir);
        }
        break;
      case "cd":
        if (args.length === 1) {
          const newPath = path.resolve(currentDir, args.join(" "));
          currentDir = moveToDir(currentDir, newPath);
        } else {
          console.log("Invalid input");
        }
        break;
      case "ls":
        if (args.length > 0) {
          console.log("Invalid input");
        } else {
          try {
            const dirContent = await printDirContent(currentDir);
            console.table(dirContent);
          } catch (err) {
            console.log("Operation failed");
          }
        }
        break;
      case "cat":
        if (args.length === 1) {
          const filePath = args.join(" ");
          try {
            await readFile(filePath);
          } catch (err) {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "add":
        if (args.length === 1) {
          const fileName = args.join(" ");
          try {
            await createFile(fileName);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "rn":
        if (args.length === 2) {
          const pathToFile = args[0];
          const newName = args[1];
          try {
            await renameFile(pathToFile, newName);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "cp":
        if (args.length === 2) {
          const filePath = args[0];
          const destDir = args[1];
          try {
            await copyFile(filePath, destDir);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "mv":
        if (args.length === 2) {
          const filePath = args[0];
          const destDir = args[1];
          try {
            await copyFile(filePath, destDir);
            deleteFile(filePath);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "rm":
        if (args.length === 1) {
          const filePath = args.join(" ");
          try {
            await deleteFile(filePath);
          } catch (err) {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "os":
        if (args.length === 1) {
          try {
            await printOSInfo(args.join(" "));
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "hash":
        if (args.length === 1) {
          const filePath = args.join(" ");
          try {
            await calculateHash(filePath);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      case "compress":
        if (args.length === 2) {
          const filePath = args[0];
          const destPath = args[1];
          try {
            await compressFile(filePath, destPath);
          } catch {
            console.log("Operation failed");
          }
        } else {
          console.log("Invalid input");
        }
        break;
      default:
        console.log("Invalid input");
        break;
    }

    console.log(`You are currently in ${currentDir}`);
    rl.prompt();
  });

  rl.on("close", () => {
    output.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
  });
};

cliStarter();
