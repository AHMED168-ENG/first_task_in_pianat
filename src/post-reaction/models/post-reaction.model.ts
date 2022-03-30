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

@ObjectType()
@Table
export class PostReaction extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column
  postId: string;

  @Field(() => [String])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  usersId: [];

  @Field(() => [String])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  types: [];

  @Field(() => [String])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  createAtLikes: [];

  @Field(() => [Posts])
  @BelongsTo(() => Posts, 'postId')
  PostReactionPost: Posts[];
}
