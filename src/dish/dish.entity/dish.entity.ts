import { Restaurant } from 'src/restaurant/restaurant.entity/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column()
  category: string;

  @ManyToMany(() => Restaurant, restaurant => restaurant.dishes)
  restaurants: Restaurant[];
}
