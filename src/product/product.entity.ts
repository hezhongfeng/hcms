import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item/item.entity';
import { ContentModel } from './contentmodel/contentmodel.entity';
import { User } from '../user/user.entity';
import { Workflow } from '../workflow/workflow.entity';

@Entity()
export class Product {
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
  appId: string;

  @Column()
  appSecret: string;

  @Column('text')
  desc: string;

  @Column('text')
  image: string;

  @OneToMany(() => Item, item => item.product)
  items: Item[];

  @OneToMany(() => ContentModel, contentModel => contentModel.product)
  contentModels: ContentModel[];

  @ManyToOne(() => Workflow, workflow => workflow.products)
  workflow: Workflow;

  @ManyToMany(() => User, user => user.products)
  users: User[];
}
