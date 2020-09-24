import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkflowState } from '../state/state.entity';
import { ActionRecord } from '../actionrecord/actionrecord.entity';

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

  @ManyToOne(() => WorkflowState, state => state.actions)
  state: WorkflowState;

  @OneToMany(() => ActionRecord, record => record.action)
  records: ActionRecord[];
}
