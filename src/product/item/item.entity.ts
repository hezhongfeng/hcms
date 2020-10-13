import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product.entity';
import { ContentModel } from '../contentmodel/contentmodel.entity';
import { ProcessRecord } from '../../process/record/record.entity';
import { Process } from '../../process/process.entity';

@Entity()
export class Item {
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

  @Column({
    default: '',
  })
  desc: string;

  @Column('json')
  value: string;

  @OneToOne(() => Process, process => process.item)
  process: Process;

  @ManyToOne(() => Product, product => product.items)
  product: Product;

  @ManyToOne(() => ContentModel, model => model.items)
  model: ContentModel;

  @OneToMany(() => ProcessRecord, record => record.item)
  records: ProcessRecord[];
}
