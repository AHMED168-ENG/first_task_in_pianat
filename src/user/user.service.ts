import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { ConversationModel } from 'src/conversation/model/conversation.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

  async create(createUserInput) {
    return await this.user.create(createUserInput);
  }

  async findAll() {
    return await this.user.findAll({
      order: [['createdAt', 'asc']],
    });
  }

  async findOne(id: string) {
    var user = await this.user.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return user;
  }
  async findOneByEmail(email: string) {
    var user = await this.user.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    return user;
  }

  async update(id, updateUserInput) {
    await this.user.update(updateUserInput, {
      where: {
        id: id,
      },
    });
    return true;
  }

  async remove(id: string) {
    await this.user.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return true;
  }

  async activeUser(id: string) {
    await this.user.update(
      { isActive: true, roles: ['User'] },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    );

    var tocken = await jwt.sign(
      { userId: id, roles: ['User'] },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIREDIN,
      },
    );
    return tocken;
  }

  async mackUserAdmin(id: string) {
    await this.user.update(
      { isAdmin: true, roles: ['User', 'Admin'] },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    );
    return true;
  }
}
