import { Module } from '@nestjs/common';
import { PostReactionService } from './post-reaction.service';
import { PostReactionResolver } from './post-reaction.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostReaction } from './models/post-reaction.model';

@Module({
  imports: [SequelizeModule.forFeature([PostReaction])],
  providers: [PostReactionResolver, PostReactionService],
})
export class PostReactionModule {}
