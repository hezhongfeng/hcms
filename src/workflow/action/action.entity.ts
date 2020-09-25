import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { WorkflowState } from '../state/state.entity';
import { ProcessRecord } from '../../process/record/record.entity';
import { Permission } from '../../user/permission/permission.entity';

@Entity()
export class WorkflowAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column('text')
  desc: string;

  @OneToMany(() => ProcessRecord, record => record.action)
  records: ProcessRecord[];

  @ManyToOne(() => WorkflowState, state => state.actions)
  state: WorkflowState;

  @ManyToMany(() => Permission, permission => permission.actions)
  @JoinTable({
    name: 'action_persission',
  })
  permissions: Permission[];
}
