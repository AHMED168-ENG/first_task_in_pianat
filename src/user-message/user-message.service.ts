import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ConversationService } from 'src/conversation/conversation.service';
import { CreateConversationInput } from 'src/conversation/dto/create-conversation.input';
import { ConversationModel } from 'src/conversation/model/conversation.model';
import { UpdateUserMessageInput } from './dto/update-user-message.input';
import { UserMessage } from './model/user-message.model';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectModel(UserMessage) private userMessage: typeof UserMessage,
    private conversationService: ConversationService,
  ) {}
  async create(createUserMessageInput) {
    await this.conversationService.create({
      From: createUserMessageInput.from,
      To: createUserMessageInput.to,
    });
    return await this.userMessage.create(createUserMessageInput);
  }

  async findAll(MyconversationWithUser) {
    return await this.userMessage.findAll({
      where: {
        [Op.or]: [
          {
            from: MyconversationWithUser.from,
            to: MyconversationWithUser.to,
          },
          {
            to: MyconversationWithUser.from,
            from: MyconversationWithUser.to,
          },
        ],
      },
      order: [['createdAt', MyconversationWithUser.order]],
    });
  }

  async updateUserMessage(id: string, updateUserMessageInput) {
    await this.userMessage.update(updateUserMessageInput, {
      where: {
        id: id,
      },
    });

    return true;
  }

  async removeUserMessage(id: string) {
    await this.userMessage.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
