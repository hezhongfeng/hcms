import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './role/role.entity';
import { Product } from '../product/product.entity';
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

  @OneToMany(() => ActionRecord, record => record.user)
  records: ActionRecord[];

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  @ManyToMany(() => Product, product => product.users)
  @JoinTable({
    name: 'user_product',
  })
  products: Product[];
}
