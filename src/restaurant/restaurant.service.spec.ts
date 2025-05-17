import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity/restaurant.entity';
import { Repository } from 'typeorm';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repo: Repository<Restaurant>;

  const mockRestaurant = {
    name: 'Trattoria Italiana',
    address: 'Calle 123',
    cuisine: 'Italiana',
    website: 'https://trattoria.com',
  };

  const mockRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockResolvedValue({ id: 1, ...mockRestaurant }),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repo = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un restaurante exitosamente', async () => {
    const result = await service.create(mockRestaurant as any);
    expect(result).toEqual({ id: 1, ...mockRestaurant });
    expect(repo.create).toHaveBeenCalledWith(mockRestaurant);
    expect(repo.save).toHaveBeenCalled();
  });
});
