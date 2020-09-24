import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './role/role.entity';
import { ActionRecord } from '../workflow/actionrecord/actionrecord.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  @OneToMany(() => ActionRecord, record => record.user)
  records: ActionRecord[];
}
