import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DishModule } from './dish/dish.module';
import { Restaurant } from './restaurant/restaurant.entity/restaurant.entity';
import { Dish } from './dish/dish.entity/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'restaurant.db',
      entities: [Restaurant, Dish],
      synchronize: true,
    }),
    RestaurantModule,
    DishModule,
  ],
})
export class AppModule {}
