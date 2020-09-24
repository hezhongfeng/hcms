import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { WorkflowState } from '../state/state.entity';
import { Item } from '../../product/item/item.entity';
import { Permission } from '../../user/permission/permission.entity';

@Entity()
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  desc: string;

  @ManyToOne(() => WorkflowState, state => state.processes)
  state: WorkflowState;

  @OneToOne(() => Item, item => item.process)
  @JoinColumn()
  item: Item;

  @ManyToOne(() => Permission, permission => permission.processes)
  permission: Permission;
}
