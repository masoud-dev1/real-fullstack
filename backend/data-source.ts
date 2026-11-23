import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from './src/users/user.entity.js';
import { Post } from './src/posts/post.entity.js';
import { Category } from './src/categories/category.entity.js';

const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '1',
  database: process.env.DB_NAME ?? 'nestjs',

  entities: [User, Post, Category],

  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: true,
});

export default AppDataSource;
