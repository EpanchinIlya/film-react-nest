import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string) {
    console.log(`[DEV] ${message}`);
  }

  error(message: string, stack?: string, context?: string) {
    console.error(`[ERROR DEV] ${message}`, stack, context);
  }

  warn(message: string) {
    console.warn(`[WARN DEV] ${message}`);
  }

  debug(message: string) {
    console.debug(`[DEBUG DEV] ${message}`);
  }

  verbose(message: string) {
    console.info(`[VERBOSE DEV] ${message}`);
  }
}
