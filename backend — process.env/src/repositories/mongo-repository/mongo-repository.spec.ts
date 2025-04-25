import { Test, TestingModule } from '@nestjs/testing';
import { MongoRepository } from './mongo-repository';

describe('MongoRepository', () => {
  let provider: MongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoRepository],
    }).compile();

    provider = module.get<MongoRepository>(MongoRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
