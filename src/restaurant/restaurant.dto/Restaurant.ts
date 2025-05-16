import { IsIn, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsIn(['Italiana', 'Japonesa', 'Mexicana', 'Colombiana', 'India', 'Internacional'])
  cuisine: string;

  @IsUrl()
  website: string;
}
