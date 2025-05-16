import { DevLogger } from './dev-logger.service';
import { JsonLogger } from './json-logger.sevise';
import { TskvLogger } from './tskv-logger.servise';

export function getLoggerByType(type: string) {
  switch (type) {
    case 'devLogger':
      return new DevLogger();
    case 'jsonLogger':
      return new JsonLogger();
    case 'tskvLogger':
      return new TskvLogger();
    default:
      return new DevLogger();
  }
}
