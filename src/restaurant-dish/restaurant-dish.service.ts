import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity/restaurant.entity';
import { Dish } from '../dish/dish.entity/dish.entity';

@Injectable()
export class RestaurantDishService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
  ) {}

  async addDishToRestaurant(restaurantId: number, dishId: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant with id ${restaurantId} not found`);
    const dish = await this.dishRepo.findOne({ where: { id: dishId } });
    if (!dish) throw new NotFoundException(`Dish with id ${dishId} not found`);
    if (!restaurant.dishes.find(d => d.id === dish.id)) {
      restaurant.dishes.push(dish);
      await this.restaurantRepo.save(restaurant);
    }
    return restaurant;
  }

  async findDishesFromRestaurant(restaurantId: number): Promise<Dish[]> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant with id ${restaurantId} not found`);
    return restaurant.dishes;
  }

  async findDishFromRestaurant(restaurantId: number, dishId: number): Promise<Dish> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant with id ${restaurantId} not found`);
    const dish = restaurant.dishes.find(d => d.id === dishId);
    if (!dish) throw new NotFoundException(`Dish with id ${dishId} not found in restaurant ${restaurantId}`);
    return dish;
  }

  async updateDishesFromRestaurant(restaurantId: number, dishIds: number[]): Promise<Restaurant> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant with id ${restaurantId} not found`);
    const dishes = await this.dishRepo.findByIds(dishIds);
    if (dishes.length !== dishIds.length) throw new NotFoundException('One or more dishes not found');
    restaurant.dishes = dishes;
    return await this.restaurantRepo.save(restaurant);
  }

  async deleteDishFromRestaurant(restaurantId: number, dishId: number): Promise<void> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant with id ${restaurantId} not found`);
    const dishIndex = restaurant.dishes.findIndex(d => d.id === dishId);
    if (dishIndex === -1) throw new NotFoundException(`Dish with id ${dishId} not found in restaurant ${restaurantId}`);
    restaurant.dishes.splice(dishIndex, 1);
    await this.restaurantRepo.save(restaurant);
  }
}
