import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Default,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserMessage } from 'src/user-message/model/user-message.model';
import { Roles } from 'modul.exports/Roles';

@Table
@ObjectType()
export class User extends Model {
  @Field((type) => String, { name: 'id', description: 'id' })
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  name: string;

  @Field()
  @Column({ type: DataType.STRING })
  email: string;

  @Field()
  @Column({ type: DataType.STRING })
  password: string;

  @Field((type) => Int, { nullable: true })
  @Column({ type: DataType.INTEGER })
  age: number;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING })
  addres: string;

  @Field({ nullable: true })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roles: Roles;

  @Field({ nullable: true })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isAdmin: boolean;

  @Field({ nullable: true })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Field(() => [UserMessage])
  @HasMany(() => UserMessage, 'from')
  user_message_from: UserMessage[];
}
