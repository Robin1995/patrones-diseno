import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LocalLogger Class
export class LocalLogger {
  constructor(private file: string) {}
  writeLog(message: string) {
    console.log(`[${this.file} Log] %c${message}`, COLORS.green);
  }

  writeError(message: string) {
    console.log(`[${this.file} Log] %c${message}`, COLORS.red);
  }

  writeWarn(message: string) {
    console.log(`[${this.file} Log] %c${message}`, COLORS.yellow);
  }

  writeInfo(message: string) {
    console.log(`[${this.file} Log] %c${message}`, COLORS.blue);
  }
}
