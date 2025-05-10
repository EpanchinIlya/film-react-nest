import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json-logger.sevise';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should call log with correct format', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const message = 'Test log message';
    const context = 'Test context';

    logger.log(message, context);

    const json = spy.mock.calls[0][0];
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(
      expect.objectContaining({
        timestamp: expect.any(String),
        level: 'log',
        message,
        context: [context],
      }),
    );
    expect(Object.keys(parsed).sort()).toEqual([
      'context',
      'level',
      'message',
      'timestamp',
    ]);
  });

  it('should call error with correct format', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const message = 'Test error message';
    const context = 'Test context';

    logger.error(message, context);

    const json = spy.mock.calls[0][0];
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(
      expect.objectContaining({
        timestamp: expect.any(String),
        level: 'error',
        message,
        context: [context],
      }),
    );
    expect(Object.keys(parsed).sort()).toEqual([
      'context',
      'level',
      'message',
      'timestamp',
    ]);
  });

  it('should call warn with correct format', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const message = 'Test warn message';
    const context = 'Test context';

    logger.warn(message, context);

    const json = spy.mock.calls[0][0];
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(
      expect.objectContaining({
        timestamp: expect.any(String),
        level: 'warn',
        message,
        context: [context],
      }),
    );
    expect(Object.keys(parsed).sort()).toEqual([
      'context',
      'level',
      'message',
      'timestamp',
    ]);
  });

  it('should call debug with correct format', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    const message = 'Test debug message';
    const context = 'Test context';

    logger.debug(message, context);

    const json = spy.mock.calls[0][0];
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(
      expect.objectContaining({
        timestamp: expect.any(String),
        level: 'debug',
        message,
        context: [context],
      }),
    );
    expect(Object.keys(parsed).sort()).toEqual([
      'context',
      'level',
      'message',
      'timestamp',
    ]);
  });

  it('should call verbose with correct format', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation();
    const message = 'Test verbose message';
    const context = 'Test context';

    logger.verbose(message, context);

    const json = spy.mock.calls[0][0];
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(
      expect.objectContaining({
        timestamp: expect.any(String),
        level: 'verbose',
        message,
        context: [context],
      }),
    );
    expect(Object.keys(parsed).sort()).toEqual([
      'context',
      'level',
      'message',
      'timestamp',
    ]);
  });
});
