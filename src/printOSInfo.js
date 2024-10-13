import os from "os";

export const printOSInfo = async (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(os.EOL);
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
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
    default: 
      throw new Error("Non existing command")
  }
};
