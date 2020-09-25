import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkflowState } from './state/state.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Workflow {
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

  @OneToMany(() => WorkflowState, state => state.workflow)
  states: WorkflowState[];

  @OneToMany(() => Product, product => product.workflow)
  products: Product[];
}
