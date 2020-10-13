import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowState } from '../workflow/state/state.entity';
import { Item } from '../product/item/item.entity';

@Entity()
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    default: '',
  })
  desc: string;

  @ManyToOne(() => WorkflowState, state => state.processes)
  state: WorkflowState;

  @OneToOne(() => Item, item => item.process)
  @JoinColumn()
  item: Item;
}
