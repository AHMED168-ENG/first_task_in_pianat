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
export class UserFrind extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  userId: string;

  @Field(() => [String])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  frindesId: [];

  @Field(() => [Date])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.DATE) })
  date: [];
}
