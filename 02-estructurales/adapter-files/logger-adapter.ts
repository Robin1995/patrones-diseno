import { Logger } from "jsr:@deno-library/logger";

// TODO: Implementar el LoggerAdapter
const logger = new Logger();

interface ILoggerAdapter {
  file: string;
  writeLog(message: string): void;
  writeError(message: string): void;
  writeWarn(message: string): void;
  writeInfo(message: string): void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  file: string;
  constructor(private fileOrigin: string) {
    this.file = fileOrigin;
  }

  writeLog(message: string) {
    logger.info(`[${this.file} Log] ${message}`);
  }

  writeError(message: string) {
    logger.error(`[${this.file} Log] ${message}`);
  }

  writeWarn(message: string) {
    logger.warning(`[${this.file} Log] ${message}`);
  }

  writeInfo(message: string) {
    logger.info(`[${this.file} Log] ${message}`);
  }
}
logger.info("Aplicación iniciada correctamente.");
logger.warn("El uso de memoria está alto.");
logger.error("Error al procesar la solicitud.");
logger.info("Procesando pago de $100 con Stripe.");
