import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string) {
    super.log(`[DEV] ${message}`);
  }

  error(message: string, stack?: string, context?: string) {
    super.error(`[ERROR DEV] ${message}`, stack, context);
  }

  warn(message: string) {
    super.warn(`[WARN DEV] ${message}`);
  }

  debug(message: string) {
    super.debug(`[DEBUG DEV] ${message}`);
  }

  verbose(message: string) {
    super.verbose(`[VERBOSE DEV] ${message}`);
  }
}
