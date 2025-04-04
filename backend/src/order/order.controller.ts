import { Body, Controller, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: OrderDTO) {
    console.log(body);

    const orderSuccess = this.orderService.createOrder(body);

    return orderSuccess;
  }
}
