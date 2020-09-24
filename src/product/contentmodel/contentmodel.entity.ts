import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Field } from '../field/field.entity';
import { Item } from '../item/item.entity';

@Entity()
export class ContentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column('text')
  desc: string;

  @ManyToMany(() => Field, field => field.models)
  @JoinTable({
    name: 'model_field',
  })
  fields: Field[];

  @OneToMany(() => Item, item => item.model)
  items: Item[];
}
