import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { WorkflowAction } from '../../workflow/action/action.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  keyName: string;

  @Column({
    default: '',
  })
  desc: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @ManyToMany(() => WorkflowAction, action => action.permissions)
  actions: WorkflowAction[];
}
