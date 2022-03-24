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
import { ConversationModel } from 'src/conversation/model/conversation.model';

@ObjectType()
@Table
export class UserMessage extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  message: string;

  @Field()
  @Column
  from: string;

  @Field()
  @Column
  to: string;

  @Field()
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isSeen: boolean;

  @Field(() => ConversationModel)
  @BelongsTo(() => ConversationModel, 'from')
  conversation: ConversationModel;
}
