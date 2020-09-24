import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item/item.entity';

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
}
