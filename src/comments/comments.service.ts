import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private comments: typeof Comments) {}

  async create(createCommentInput) {
    return await this.comments.create(createCommentInput);
  }

  async findAll(userId, postId, offset) {
    return await this.comments.findAll({
      where: {
        userId: userId,
        postId: postId,
      },
      limit: 3,
      offset: offset,
    });
  }

  async update(updateCommentInput) {
    await this.comments.update(updateCommentInput, {
      where: {
        userId: updateCommentInput.userId,
        postId: updateCommentInput.postId,
      },
    });
    return true;
  }

  async remove(id: string) {
    return await this.comments.destroy({
      where: {
        id: id,
      },
    });
  }
}
