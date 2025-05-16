import { Controller, Get } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  @Get()
  getHello() {
    return { message: 'API funcionando 🎉' };
  }
}
