import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseType } from '../basetype/basetype.entity';
import { ContentModel } from '../contentmodel/contentmodel.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

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

  @ManyToOne(() => ContentModel, model => model.fields)
  model: ContentModel;
}
