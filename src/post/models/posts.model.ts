import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comments } from 'src/comments/models/comment.model';
import { PostReaction } from 'src/post-reaction/models/post-reaction.model';
import { User } from 'src/user/model/user.model';

@ObjectType()
@Table
export class Posts extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  userId: string;

  @Field()
  @Column({ type: DataType.TEXT })
  post: string;

  @Field()
  @Column({ type: DataType.STRING })
  image: string;

  @Field()
  @Column({ type: DataType.STRING })
  video: string;

  @Field(() => [Comments])
  @HasMany(() => Comments, 'postId')
  postComments: Comments[];

  @Field(() => [PostReaction])
  @HasMany(() => PostReaction, 'postId')
  postPostReaction: PostReaction[];

  @Field(() => User)
  @BelongsTo(() => User, 'userId')
  postUser: User;
}
