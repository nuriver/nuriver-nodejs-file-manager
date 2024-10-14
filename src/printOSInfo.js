import os from "os";

export const printOSInfo = async (arg) => {
  switch (arg) {
    case "--EOL":
    const EOL = os.EOL === '\n' ? '\\n' : '\\r\\n';
    console.log(`EOL is: ${EOL}`);
      break;
    case "--cpus":
      const cpus = os.cpus();
      const cpuDataPromises = cpus.map(async (cpu, index) => {
        return {
          coreNumber: index + 1,
          modelAndClockRate: cpu.model,
        };
      });
      const cpuData = await Promise.all(cpuDataPromises);
      console.table(cpuData);
      break;
    case "--homedir":
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`System username: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    default: 
      throw new Error("Non existing command")
  }
};
