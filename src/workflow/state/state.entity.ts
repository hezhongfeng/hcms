import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Workflow } from '../workflow.entity';
import { WorkflowAction } from '../action/action.entity';
import { Process } from '../../process/process.entity';

@Entity()
export class WorkflowState {
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

  @ManyToOne(() => Workflow, workflow => workflow.states)
  workflow: Workflow;

  @OneToMany(() => WorkflowAction, action => action.state)
  actions: WorkflowAction[];

  @OneToMany(() => Process, process => process.state)
  processes: Process[];
}
