import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto.js';
import { Post } from './post.entity.js';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>
  ) {}

  findAll() {
    return this.repo.find({
      relations: {user: true , category: true},
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({
      where: { id },
      relations: {user : true , category : true},
    });
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  create(dto: CreatePostDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<CreatePostDto>) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { deleted: true };
  }
}
