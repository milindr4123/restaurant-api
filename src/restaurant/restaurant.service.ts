import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity/restaurant.entity';
import { RestaurantDto } from './restaurant.dto/Restaurant';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(dto: RestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(dto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async update(id: number, dto: RestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, dto);
    return await this.restaurantRepository.save(restaurant);
  }

  async delete(id: number): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }
}
