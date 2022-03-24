import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserMessage } from 'src/user-message/model/user-message.model';
import { User } from 'src/user/model/user.model';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { ConversationModel } from './model/conversation.model';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel)
    private conversationModel: typeof ConversationModel,
  ) {}

  async create(createConversationInput) {
    var userFromConversation = await this.findOne(
      createConversationInput.From,
      createConversationInput.To,
    );
    var userToConversation = await this.findOne(
      createConversationInput.To,
      createConversationInput.From,
    );
    if (!userFromConversation && !userToConversation) {
      await this.conversationModel.create({
        To: createConversationInput.From,
        From: createConversationInput.To,
      });
      await this.conversationModel.create({
        To: createConversationInput.To,
        From: createConversationInput.From,
      });
    } else if (!userFromConversation && userToConversation) {
      await this.conversationModel.create({
        From: createConversationInput.From,
        To: createConversationInput.To,
      });
    }
    return true;
  }

  async findAllConversationWithUserWithLastMessage(From: string) {
    return await this.conversationModel.findAll({
      include: [
        {
          model: User,
          as: 'conversation_user_from',
          include: [
            {
              model: UserMessage,
              as: 'user_message_from',
              order: [['createdAt', 'desc']],
              limit: 1,
            },
          ],
        },
        {
          model: User,
          as: 'conversation_user_to',
          include: [
            {
              model: UserMessage,
              as: 'user_message_from',
              order: [['createdAt', 'desc']],
              limit: 1,
            },
          ],
        },
      ],
      where: {
        From: From,
      },
    });
  }

  async findOne(From: string, To: string) {
    var userConversation = await this.conversationModel.findOne({
      where: {
        From: From,
        To: To,
      },
    });
    return userConversation;
  }

  remove(id: string) {
    this.conversationModel.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
