import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantDishService } from './restaurant-dish.service';
import { RestaurantDishController } from './restaurant-dish.controller';
import { Restaurant } from '../restaurant/restaurant.entity/restaurant.entity';
import { Dish } from '../dish/dish.entity/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish])],
  providers: [RestaurantDishService],
  controllers: [RestaurantDishController]
})
export class RestaurantDishModule {}
