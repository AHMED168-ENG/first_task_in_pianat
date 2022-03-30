import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostReactionInput } from './dto/create-post-reaction.input';
import { UpdatePostReactionInput } from './dto/update-post-reaction.input';
import { PostReaction } from './models/post-reaction.model';

@Injectable()
export class PostReactionService {
  constructor(
    @InjectModel(PostReaction) private postReaction: typeof PostReaction,
  ) {}
  async createReactPost(createPostReactionInput) {
    var postReact = await this.findOne(createPostReactionInput.postId);
    if (!postReact) {
      return await this.create(createPostReactionInput);
    } else {
      return await this.createReactInReacts(postReact, createPostReactionInput);
    }
  }

  async create(createPostReactionInput) {
    return await this.postReaction.create({
      postId: createPostReactionInput.postId,
      usersId: [createPostReactionInput.userId],
      types: [createPostReactionInput.type],
      createAtLikes: [Date.now()],
    });
  }
  async createReactInReacts(postReact, createPostReactionInput) {
    var postReactData = postReact.toJSON();

    if (postReactData.usersId.includes(createPostReactionInput.userId)) {
      postReactData.types.splice(
        postReactData.usersId.indexOf(createPostReactionInput.userId),
        1,
        createPostReactionInput.type,
      );
      postReactData.createAtLikes.splice(
        postReactData.usersId.indexOf(createPostReactionInput.userId),
        1,
        Date.now(),
      );
    } else {
      postReactData.usersId.push(createPostReactionInput.userId);
      postReactData.types.push(createPostReactionInput.type);
      postReactData.createAtLikes.push(Date.now());
    }

    await this.update(postReactData);
    return postReactData;
  }

  async findOne(postId: string) {
    return await this.postReaction.findOne({
      where: {
        postId: postId,
      },
    });
  }

  async update(postReact) {
    await this.postReaction.update(postReact, {
      where: {
        postId: postReact.postId,
      },
    });
  }

  async removeFromPostReact(createPostReactionInput) {
    var postReactData = postReact.toJSON();
    var postReact = await this.findOne(createPostReactionInput.userId);
    postReactData.types.splice(
      postReactData.usersId.indexOf(createPostReactionInput.userId),
      1,
    );
    postReactData.createAtLikes.splice(
      postReactData.usersId.indexOf(createPostReactionInput.userId),
      1,
    );
    postReactData.usersId.splice(
      postReactData.usersId.indexOf(createPostReactionInput.userId),
      1,
    );
    if (postReactData.usersId.length > 0) {
      await this.update(postReact);
    } else {
      await this.remove(createPostReactionInput.postId);
    }
  }

  async remove(postId: string) {
    return await this.postReaction.destroy({
      where: {
        postId: postId,
      },
    });
  }
}
