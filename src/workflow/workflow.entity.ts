import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WorkflowState } from './state/state.entity';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column('text')
  desc: string;

  @OneToMany(() => WorkflowState, state => state.workflow)
  states: WorkflowState[];
}
