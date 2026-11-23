import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity.js';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) name: string;
  @OneToMany(() => Post, (p) => p.category) posts: Post[];
}