import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { ContentModel } from '../contentmodel/contentmodel.entity';
import { ActionRecord } from '../../workflow/actionrecord/actionrecord.entity';
import { Process } from '../../workflow/process/process.entity';

@Entity()
export class Item {
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

  @Column('json')
  value: string;

  @OneToOne(() => Process, process => process.item)
  process: Process;

  @ManyToOne(() => Product, product => product.items)
  product: Product;

  @ManyToOne(() => ContentModel, model => model.items)
  model: ContentModel;

  @OneToMany(() => ActionRecord, record => record.item)
  records: ActionRecord[];
}
