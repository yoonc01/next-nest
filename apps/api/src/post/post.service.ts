import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  findAll(): Post[] {
    return this.postRepository.find();
  }

  findOne(id: number): Post | null {
    return this.postRepository.findOne({ where: { id } });
  }

  create(createPostDto: CreatePostDto): Post {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  update(id: number, updatePostDto: UpdatePostDto): Post | null {
    this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  remove(id: number): void {
    this.postRepository.delete(id);
  }
}
