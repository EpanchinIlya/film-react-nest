import { TestingModule, Test } from '@nestjs/testing';
import { JsonLogger } from './json-logger.sevise';

describe('DevLogger', () => {
  let service: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    service = module.get<JsonLogger>(JsonLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
