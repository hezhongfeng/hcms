import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field } from '../field/field.entity';

@Entity()
export class BaseType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  keyName: string;

  @Column({
    default: '',
  })
  desc: string;

  @OneToMany(() => Field, field => field.baseType)
  fields: Field[];
}
