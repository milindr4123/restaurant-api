import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantDishService } from './restaurant-dish.service';

@Controller('restaurants/:restaurantId/dishes')
export class RestaurantDishController {
  constructor(private readonly service: RestaurantDishService) {}

  @Post(':dishId')
  addDishToRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Param('dishId') dishId: string
  ) {
    return this.service.addDishToRestaurant(+restaurantId, +dishId);
  }

  @Get()
  findDishesFromRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.service.findDishesFromRestaurant(+restaurantId);
  }

  @Get(':dishId')
  findDishFromRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Param('dishId') dishId: string
  ) {
    return this.service.findDishFromRestaurant(+restaurantId, +dishId);
  }

  @Put()
  updateDishesFromRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Body() body: { dishIds: number[] }
  ) {
    return this.service.updateDishesFromRestaurant(+restaurantId, body.dishIds);
  }

  @Delete(':dishId')
  deleteDishFromRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Param('dishId') dishId: string
  ) {
    return this.service.deleteDishFromRestaurant(+restaurantId, +dishId);
  }
}
