import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Post } from '../posts/post.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Post, (p) => p.user)
  posts: Relation<Post[]>;

  @CreateDateColumn()
  createdAt: Date;
}
