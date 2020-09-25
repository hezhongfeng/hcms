import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field } from '../field/field.entity';
import { Item } from '../item/item.entity';

@Entity()
export class ContentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    unique: true,
  })
  name: string;

  @Column('text')
  desc: string;

  @OneToMany(() => Field, field => field.model)
  fields: Field[];

  @OneToMany(() => Item, item => item.model)
  items: Item[];
}
