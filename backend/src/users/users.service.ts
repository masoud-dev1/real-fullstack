import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';



@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const u = await this.repo.findOneBy({ id });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(dto: CreateUserDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<CreateUserDto>) {
    const u = await this.findOne(id);
    Object.assign(u, dto);
    return this.repo.save(u);
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
    return { deleted: true };
  }
}
