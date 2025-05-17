import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from './dish.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dish } from './dish.entity/dish.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockDish = {
  id: 1,
  name: 'Sopa',
  description: 'Caliente',
  price: 12000,
  category: 'entrada',
};

describe('DishService', () => {
  let service: DishService;
  let repo: jest.Mocked<Repository<Dish>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishService,
        {
          provide: getRepositoryToken(Dish),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DishService>(DishService);
    repo = module.get(getRepositoryToken(Dish));
  });

  it('debería crear un plato exitosamente', async () => {
    repo.create.mockReturnValue(mockDish as any);
    repo.save.mockResolvedValue(mockDish as any);

    const dto = { name: 'Sopa', description: 'Caliente', price: 12000, category: 'entrada' };
    const result = await service.create(dto as any);

    expect(result).toEqual(mockDish);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(mockDish);
  });

  it('debería actualizar un plato exitosamente', async () => {
    const updated = { ...mockDish, name: 'Ensalada' };
    repo.findOne.mockResolvedValue(mockDish as any);
    repo.save.mockResolvedValue(updated as any);

    const dto = { name: 'Ensalada', description: 'Caliente', price: 12000, category: 'entrada' };
    const result = await service.update(1, dto as any);

    expect(result).toEqual(updated);
    expect(repo.save).toHaveBeenCalledWith({ ...mockDish, ...dto });
  });

  it('debería lanzar NotFoundException si el plato no existe al actualizar', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.update(999, {} as any)).rejects.toThrow(NotFoundException);
  });
});