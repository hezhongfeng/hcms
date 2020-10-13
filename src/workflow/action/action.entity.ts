import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { WorkflowState } from '../state/state.entity';
import { ProcessRecord } from '../../process/record/record.entity';
import { Permission } from '../../user/permission/permission.entity';

@Entity()
export class WorkflowAction {
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

  @OneToMany(() => ProcessRecord, record => record.action)
  records: ProcessRecord[];

  @ManyToOne(() => WorkflowState, state => state.actions)
  state: WorkflowState;

  @ManyToMany(() => Permission, permission => permission.actions)
  @JoinTable({
    name: 'action_permission',
  })
  permissions: Permission[];
}
