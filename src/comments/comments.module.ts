import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comments } from './models/comment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
