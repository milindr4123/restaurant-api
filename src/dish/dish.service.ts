import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity/dish.entity';
import { DishDto } from './dish.dto/dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
  ) {}

  async create(dto: DishDto): Promise<Dish> {
    const dish = this.dishRepo.create(dto);
    return this.dishRepo.save(dish);
  }

  async findAll(): Promise<Dish[]> {
    return this.dishRepo.find();
  }

  async findOne(id: number): Promise<Dish> {
    const dish = await this.dishRepo.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException(`Dish with id ${id} not found`);
    }
    return dish;
  }

  async update(id: number, dto: DishDto): Promise<Dish> {
    const dish = await this.findOne(id);
    Object.assign(dish, dto);
    return this.dishRepo.save(dish);
  }

  async delete(id: number): Promise<void> {
    const result = await this.dishRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with id ${id} not found`);
    }
  }
}
