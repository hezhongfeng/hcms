import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { BaseType } from '../basetype/basetype.entity';
import { ContentModel } from '../contentmodel/contentmodel.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  keyName: string;

  @Column('text')
  desc: string;

  @ManyToOne(() => BaseType, baseType => baseType.fields)
  baseType: BaseType;

  @ManyToMany(() => ContentModel, model => model.fields)
  models: ContentModel[];
}
