import { Body, Controller, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: OrderDTO) {
    console.log(body);

    try {
      const orderSuccess = await this.orderService.createOrder(body); // Ждем завершения асинхронного метода
      return orderSuccess; // Возвращаем успешный результат
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Выбрасываем ошибку, если что-то пошло не так
    }
  }
}
