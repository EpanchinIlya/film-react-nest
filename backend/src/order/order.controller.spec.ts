import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { NotFoundException } from '@nestjs/common';

describe('OrderController', () => {
  let orderController: OrderController;

  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    // orderService = moduleRef.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an order and return success result', async () => {
    const dto: OrderDTO = {
      email: 'test@example.com',
      phone: '+123456789',
      tickets: [
        {
          film: 'Film A',
          session: 's123',
          daytime: '2025-05-10T14:00:00Z',
          day: '2025-05-10',
          time: '14:00',
          row: 5,
          seat: 7,
          price: 300,
        },
      ],
    };

    const mockResult = {
      total: 1,
      items: [
        {
          id: 'ticket1',
          film: 'Film A',
          session: 's123',
          daytime: '2025-05-10T14:00:00Z',
          row: 5,
          seat: 7,
          price: 300,
        },
      ],
    };

    orderServiceMock.createOrder.mockResolvedValue(mockResult);

    const result = await orderController.create(dto);
    expect(orderServiceMock.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResult);
  });

  it('should throw error if orderService.createOrder fails', async () => {
    const dto: OrderDTO = {
      email: 'fail@example.com',
      phone: '+987654321',
      tickets: [],
    };

    const error = new NotFoundException('Order failed');
    orderServiceMock.createOrder.mockRejectedValue(error);

    await expect(orderController.create(dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(orderServiceMock.createOrder).toHaveBeenCalledWith(dto);
  });
});
