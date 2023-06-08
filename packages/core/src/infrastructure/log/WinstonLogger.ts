import { Logger } from './Logger';
import { Logger as ExternalWinstonLogger } from 'winston';
import winston from 'winston';

export class WinstonLogger implements Logger {
  private logger: ExternalWinstonLogger;

  public constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }
  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
