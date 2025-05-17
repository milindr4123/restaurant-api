import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantDishService } from './restaurant-dish.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/restaurant.entity/restaurant.entity';
import { Dish } from '../dish/dish.entity/dish.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockDish = { id: 1, name: 'Sopa' } as Dish;
const mockRestaurant = { id: 1, name: 'R1', dishes: [] as Dish[] } as Restaurant;

describe('RestaurantDishService', () => {
  let service: RestaurantDishService;
  let restaurantRepo: jest.Mocked<Repository<Restaurant>>;
  let dishRepo: jest.Mocked<Repository<Dish>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantDishService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Dish),
          useValue: {
            findOne: jest.fn(),
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(RestaurantDishService);
    restaurantRepo = module.get(getRepositoryToken(Restaurant));
    dishRepo = module.get(getRepositoryToken(Dish));
  });

  it('debería asociar un plato a un restaurante', async () => {
    restaurantRepo.findOne.mockResolvedValue({ ...mockRestaurant, dishes: [] } as any);
    dishRepo.findOne.mockResolvedValue(mockDish as any);
    restaurantRepo.save.mockResolvedValue({ ...mockRestaurant, dishes: [mockDish] } as any);

    const result = await service.addDishToRestaurant(1, 1);

    expect(result.dishes).toContainEqual(mockDish);
    expect(restaurantRepo.save).toHaveBeenCalled();
  });

  it('debería devolver los platos asociados a un restaurante', async () => {
    restaurantRepo.findOne.mockResolvedValue({ ...mockRestaurant, dishes: [mockDish] } as any);

    const result = await service.findDishesFromRestaurant(1);

    expect(result).toEqual([mockDish]);
    expect(restaurantRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['dishes'] });
  });

  it('debería lanzar NotFoundException si el restaurante no existe', async () => {
    restaurantRepo.findOne.mockResolvedValue(null);

    await expect(service.findDishesFromRestaurant(999)).rejects.toThrow(NotFoundException);
  });
});