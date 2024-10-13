import { fileURLToPath } from "url";
import path from "path";
import { stdin as input, stdout as output } from "process";
import readline from "node:readline/promises";

const cliStarter = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rl = readline.createInterface(input, output);
  let username = process.env.npm_config_username;

  if (username === undefined) {
    username = "Stranger";
  }

  rl.write(`Welcome to the File Manager, ${username}!\n`);
  rl.write(`You are currently in ${__dirname}\n`);
  rl.setPrompt("Enter a command: ");
  rl.prompt();
  rl.on("line", (input) => {
    const trimmedInput = input.toString().trim();
    if (trimmedInput === ".exit") {
      rl.close();
    }
  });

  rl.on("close", () => {
    output.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
  });
};

cliStarter();
