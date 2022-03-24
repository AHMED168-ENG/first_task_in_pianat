import { Field, Int, ObjectType } from '@nestjs/graphql';
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
import { UserMessage } from 'src/user-message/model/user-message.model';
import { User } from 'src/user/model/user.model';

@Table
@ObjectType()
export class ConversationModel extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column
  id: string;

  @Field()
  @Column
  From: string;

  @Field()
  @Column
  To: string;

  @Field({ nullable: true })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  hasShourtcut: boolean;

  @Field(() => [UserMessage])
  @HasMany(() => UserMessage, 'from')
  FromMessage: UserMessage[];

  @Field(() => User)
  @BelongsTo(() => User, 'From')
  conversation_user_from: any;

  @Field(() => User)
  @BelongsTo(() => User, 'To')
  conversation_user_to: User;
}
