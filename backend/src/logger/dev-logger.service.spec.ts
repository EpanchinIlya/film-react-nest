import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './dev-logger.service';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    logger = module.get<DevLogger>(DevLogger);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // очищаем все моки после каждого теста
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should call log with [DEV] prefix', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('Test log');
    expect(spy).toHaveBeenCalledWith('[DEV] Test log');
  });

  it('should call error with [ERROR DEV] prefix', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error('Test error', 'stack trace', 'TestContext');
    expect(spy).toHaveBeenCalledWith(
      '[ERROR DEV] Test error',
      'stack trace',
      'TestContext',
    );
  });

  it('should call warn with [WARN DEV] prefix', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    logger.warn('Test warn');
    expect(spy).toHaveBeenCalledWith('[WARN DEV] Test warn');
  });

  it('should call debug with [DEBUG DEV] prefix', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    logger.debug('Test debug');
    expect(spy).toHaveBeenCalledWith('[DEBUG DEV] Test debug');
  });

  it('should call verbose with [VERBOSE DEV] prefix', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation(); // verbose мапится на log
    logger.verbose('Test verbose');
    expect(spy).toHaveBeenCalledWith('[VERBOSE DEV] Test verbose');
  });
});
