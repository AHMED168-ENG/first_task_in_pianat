import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

  @Field()
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  usersId: string;

  @Field()
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  types: string;

  @Field()
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  createAtLikes: string;
}
