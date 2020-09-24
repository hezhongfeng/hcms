import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { Process } from '../../workflow/process/process.entity';

@Entity()
export class Permission {
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

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @OneToMany(() => Process, process => process.permission)
  processes: Process[];
}
