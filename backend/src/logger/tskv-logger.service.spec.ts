import { TestingModule, Test } from '@nestjs/testing';
import { TskvLogger } from './tskv-logger.servise';

describe('DevLogger', () => {
  let service: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    service = module.get<TskvLogger>(TskvLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
