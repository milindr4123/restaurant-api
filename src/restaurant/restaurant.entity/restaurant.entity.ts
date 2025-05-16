import { Dish } from 'src/dish/dish.entity/dish.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

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
