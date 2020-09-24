import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkflowAction } from '../action/action.entity';
import { User } from '../../user/user.entity';
import { Item } from '../../product/item/item.entity';

@Entity()
export class ActionRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  remark: string;

  @ManyToOne(() => WorkflowAction, action => action.records)
  action: WorkflowAction;

  @ManyToOne(() => User, user => user.records)
  user: User;

  @ManyToOne(() => Item, item => item.records)
  item: Item;
}
