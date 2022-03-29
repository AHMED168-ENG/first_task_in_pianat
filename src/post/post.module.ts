import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './models/posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
