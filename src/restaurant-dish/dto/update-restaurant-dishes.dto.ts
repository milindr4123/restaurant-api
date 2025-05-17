import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class UpdateRestaurantDishesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dishIds: number[];
} 