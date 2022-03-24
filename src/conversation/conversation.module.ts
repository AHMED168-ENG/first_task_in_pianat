import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConversationModel } from './model/conversation.model';
import { UserMessage } from 'src/user-message/model/user-message.model';
import { jwtStrategy } from 'src/user/jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([ConversationModel])],
  providers: [ConversationResolver, ConversationService, jwtStrategy],
})
export class ConversationModule {}
