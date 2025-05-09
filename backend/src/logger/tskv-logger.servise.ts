import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const parts: string[] = [];

    parts.push(`level=${level}`);
    parts.push(`message=${String(message)}`);

    for (const param of optionalParams) {
      if (typeof param === 'object' && param !== null) {
        for (const [key, value] of Object.entries(param)) {
          const serializedValue =
            typeof value === 'object' && value !== null
              ? JSON.stringify(value)
              : String(value);
          parts.push(`${key}=${serializedValue}`);
        }
      } else {
        parts.push(`extra=${String(param)}`);
      }
    }

    return parts.join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, ...optionalParams));
  }
}
