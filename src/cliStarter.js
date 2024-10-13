import { fileURLToPath } from "url";
import path from "path";
import { stdin as input, stdout as output } from "process";
import readline from "node:readline/promises";

const cliStarter = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let currentDir = __dirname;
  const rl = readline.createInterface(input, output);
  let username = process.env.npm_config_username;

  if (username === undefined) {
    username = "Stranger";
  }

  rl.write(`Welcome to the File Manager, ${username}!\n`);
  rl.write(`You are currently in ${currentDir}\n`);
  rl.setPrompt("Enter a command: ");
  rl.prompt();
  rl.on("line", (input) => {
    const trimmedInput = input.toString().trim();

    if (trimmedInput === ".exit") {
      rl.close();
      return;
    }

    switch (trimmedInput) {
      case "up":
        currentDir = path.resolve(currentDir, "..");
        break;
      case "test":
        console.log("Test command was entered");
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
