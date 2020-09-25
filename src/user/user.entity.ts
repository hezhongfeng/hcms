import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role/role.entity';
import { Product } from '../product/product.entity';
import { ProcessRecord } from '../process/record/record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => ProcessRecord, record => record.user)
  records: ProcessRecord[];

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
