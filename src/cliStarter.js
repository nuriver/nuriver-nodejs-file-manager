import { fileURLToPath } from "url";
import path from "path";

const cliStarter = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const { stdin, stdout } = process;
  let username = process.env.npm_config_username;

  if (username === undefined) {
    username = "Stranger";
  }

  stdout.write(`Welcome to the File Manager, ${username}!\n`);
  stdout.write(`You are currently in ${__dirname}\n`);

  stdin.on("data", (data) => {
    const input = data.toString().trim();
    if (input === ".exit") {
      process.exit();
    }
    stdout.write(data);
  });

  process.on("SIGINT", () => process.exit());

  process.on("exit", () => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
  });
};

cliStarter();
