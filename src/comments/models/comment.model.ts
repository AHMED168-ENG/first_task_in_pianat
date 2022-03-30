import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Posts } from 'src/post/models/posts.model';
import { User } from 'src/user/model/user.model';

@ObjectType()
@Table
export class Comments extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  comment: string;

  @Field()
  @Column({ type: DataType.STRING })
  userId: string;

  @Field()
  @Column({ type: DataType.STRING })
  postId: string;

  @Field(() => [Posts])
  @BelongsTo(() => Posts, 'postId')
  commentPost: Posts[];

  @Field(() => User)
  @BelongsTo(() => User, 'userId')
  commentsUser: User;
}
