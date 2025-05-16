import { IsIn, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class DishDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsIn(['entrada', 'plato fuerte', 'postre', 'bebida'])
  category: string;
}
