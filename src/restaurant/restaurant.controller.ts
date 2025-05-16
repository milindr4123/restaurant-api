import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity/restaurant.entity';
import { RestaurantDto } from './restaurant.dto/Restaurant';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() dto: RestaurantDto): Promise<Restaurant> {
    return this.restaurantService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: RestaurantDto): Promise<Restaurant> {
    return this.restaurantService.update(+id, dto);
  }

  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.restaurantService.delete(+id);
  }
}
