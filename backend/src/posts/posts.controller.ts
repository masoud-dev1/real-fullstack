// src/posts/posts.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Controller('posts')
export class PostsController {
  constructor(private svc: PostsService) {}
  @Get() findAll() {
    return this.svc.findAll();
  }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
  @Post() create(@Body() dto: CreatePostDto) {
    return this.svc.create(dto);
  }
  @Patch(':id') update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreatePostDto>,
  ) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
