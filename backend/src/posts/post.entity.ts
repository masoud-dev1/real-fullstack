import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { User } from '../users/user.entity.js';
import { Category } from '../categories/category.entity.js';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (u) => u.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column()
  userId: number;

  @ManyToOne(() => Category, (c) => c.posts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category> | null;

  @Column({ nullable: true })
  categoryId: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
