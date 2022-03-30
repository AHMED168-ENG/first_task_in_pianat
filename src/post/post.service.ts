import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from 'src/comments/models/comment.model';
import { PostReaction } from 'src/post-reaction/models/post-reaction.model';
import { User } from 'src/user/model/user.model';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Posts } from './models/posts.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Posts) private posts: typeof Posts) {}

  async create(createPostInput) {
    return await this.posts.create(createPostInput);
  }

  async findAll() {
    return await this.posts.findAll({
      include: [
        {
          model: User,
          as: 'postUser',
        },
        {
          model: Comments,
          as: 'postComments',
          include: [{ model: User, as: 'commentsUser' }],
          limit: 3,
        },
        {
          model: PostReaction,
          as: 'postPostReaction',
        },
      ],
    });
  }

  findOne(userId: string) {
    return this.posts.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async update(updatePostInput) {
    await this.posts.update(updatePostInput, {
      where: {
        userId: updatePostInput.userId,
      },
    });
    return true;
  }

  async remove(userId: string) {
    await this.posts.destroy({
      where: {
        userId: userId,
      },
    });
    return true;
  }
}
