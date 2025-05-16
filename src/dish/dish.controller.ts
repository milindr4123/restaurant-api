import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishDto } from './dish.dto/dish.dto';
import { Dish } from './dish.entity/dish.entity';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() dto: DishDto): Promise<Dish> {
    return this.dishService.create(dto);
  }

  @Get()
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dish> {
    return this.dishService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: DishDto): Promise<Dish> {
    return this.dishService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.dishService.delete(+id);
  }
}
