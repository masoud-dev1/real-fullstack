import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';


@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const c = await this.repo.findOneBy({ id });
    if (!c) throw new NotFoundException('Category not found');
    return c;
  }

  create(dto: CreateCategoryDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<CreateCategoryDto>) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
    return { deleted: true };
  }
}
