import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { FILM_REPOSITORY } from 'src/repositories/filmRepository';
import { MemoryRepository } from 'src/repositories/memory-repository/memory-repository';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: FILM_REPOSITORY,
          useClass: MemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
