import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkflowAction } from '../../workflow/action/action.entity';
import { User } from '../../user/user.entity';
import { Item } from '../../product/item/item.entity';

@Entity()
export class ProcessRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  remark: string;

  @ManyToOne(() => WorkflowAction, action => action.records)
  action: WorkflowAction;

  @ManyToOne(() => User, user => user.records)
  user: User;

  @ManyToOne(() => Item, item => item.records)
  item: Item;
}
