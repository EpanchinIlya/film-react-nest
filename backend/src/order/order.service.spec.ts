import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FILM_REPOSITORY } from 'src/repositories/filmRepository';
import { MemoryRepository } from 'src/repositories/memory-repository/memory-repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FILM_REPOSITORY,
          useClass: MemoryRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
