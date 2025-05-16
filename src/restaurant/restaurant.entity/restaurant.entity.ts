import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Dish } from '../restaurant.dto/dish.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  cuisine: string;

  @Column()
  website: string;

  @ManyToMany(() => Dish, dish => dish.restaurants, { cascade: true })
  @JoinTable()
  dishes: Dish[];
}
