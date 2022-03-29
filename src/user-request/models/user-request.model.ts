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

  @Field()
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  from: string;

  @Field()
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.DATE) })
  date: Date;

  @Field()
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.BOOLEAN) })
  isSeen: boolean;
}
