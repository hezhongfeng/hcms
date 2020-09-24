import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Item } from './item/item.entity';
import { User } from '../user/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  appId: string;

  @Column()
  appSecret: string;

  @Column('text')
  desc: string;

  @Column('text')
  image: string;

  @OneToMany(() => Item, item => item.product)
  items: Item[];

  @ManyToMany(() => User, user => user.products)
  users: User[];
}
