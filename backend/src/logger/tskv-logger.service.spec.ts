import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv-logger.servise';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    logger = module.get<TskvLogger>(TskvLogger);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const message = 'Test message';
  const obj = {
    user: 'john',
    action: 'login',
    details: { ip: '192.168.1.1', device: 'laptop' }, // добавлен вложенный объект
  };
  const extraParams = [obj, null, undefined, 'extra'];

  function buildExpected(level: string): string {
    return [
      `level=${level}`,
      `message=${message}`,
      `user=john`,
      `action=login`,
      `details={"ip":"192.168.1.1","device":"laptop"}`, // сериализация вложенного объекта
      `extra=null`,
      `extra=undefined`,
      `extra=extra`,
    ].join('\t');
  }

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should log with exact format', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.log(message, ...extraParams);
    expect(spy).toHaveBeenCalledWith(buildExpected('log'));
  });

  it('should error with exact format', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error(message, ...extraParams);
    expect(spy).toHaveBeenCalledWith(buildExpected('error'));
  });

  it('should warn with exact format', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    logger.warn(message, ...extraParams);
    expect(spy).toHaveBeenCalledWith(buildExpected('warn'));
  });

  it('should debug with exact format', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    logger.debug(message, ...extraParams);
    expect(spy).toHaveBeenCalledWith(buildExpected('debug'));
  });

  it('should verbose with exact format', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation();
    logger.verbose(message, ...extraParams);
    expect(spy).toHaveBeenCalledWith(buildExpected('verbose'));
  });
});
