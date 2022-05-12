import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { UserMessageResolver } from './user-message.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserMessage } from './model/user-message.model';
import { ConversationModel } from 'src/conversation/model/conversation.model';
import { ConversationService } from 'src/conversation/conversation.service';
import { jwtStrategy } from 'src/user/jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([UserMessage, ConversationModel])],
  providers: [
    UserMessageResolver,
    UserMessageService,
    ConversationService,
    jwtStrategy,
  ],
})
export class UserMessageModule {}
