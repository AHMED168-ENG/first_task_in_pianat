import { Field, ObjectType } from '@nestjs/graphql';
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
export class UserRequest extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  to: string;

  @Field(() => [String])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  from: [];

  @Field(() => [Date])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.DATE) })
  date: [];

  @Field(() => [Boolean])
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.BOOLEAN) })
  isSeen: [];
}
