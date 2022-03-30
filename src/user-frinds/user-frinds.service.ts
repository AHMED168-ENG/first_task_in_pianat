import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { UserFrind } from './models/user-frind.model';

@Injectable()
export class UserFrindsService {
  constructor(
    @InjectModel(UserFrind) private userFrind: typeof UserFrind,
    private userService: UserService,
  ) {}
  async create(userId, frindId) {
    await this.userFrind.create({
      userId: userId,
      frindesId: [frindId],
      date: [Date.now()],
    });
  }

  async createNewFrind(operation_Frindes) {
    var userFrindes = await this.findOne(operation_Frindes.userId);
    var userFrindesDate = userFrindes.toJSON();
    userFrindesDate.frindesId.push(operation_Frindes.frindesId);
    userFrindesDate.date.push(Date.now());
    await this.update(userFrindesDate);
  }

  async findAllFrindes(userId: string) {
    var userFrindes = await this.findOne(userId);
    var userFrindesData = userFrindes.toJSON();
    var frindesId = [];
    userFrindesData.frindesId.forEach((ele) => {
      frindesId.push(ele);
    });
    return this.userService.findAllInclude(frindesId);
  }

  async getUserFrindIds(userId: string) {
    var userFrindes = await this.findAllFrindes(userId);
    var userIds = [];
    userFrindes.forEach((ele) => {
      userIds.push(ele.id);
    });
    return userIds;
  }

  async findOne(userId: string) {
    return await this.userFrind.findOne({
      where: {
        userId: userId,
      },
    });
  }

  ifFindInUserFrindes(frindId: string, userfrinds) {
    if (userfrinds.frindesId.includes(frindId)) {
      return true;
    } else {
      return false;
    }
  }

  async update(userFrindData) {
    this.userFrind.update(userFrindData, {
      where: {
        userId: userFrindData.userId,
      },
    });
  }

  async remove(userId) {
    return await this.userFrind.destroy({
      where: {
        userId: userId,
      },
    });
  }

  async removeUserFrind(userfrinds, from) {
    var userfrindsData = userfrinds.toJSON();
    userfrindsData.date.splice(userfrindsData.frindesId.indexOf(from), 1);
    userfrindsData.frindesId.splice(userfrindsData.frindesId.indexOf(from), 1);
    if (userfrindsData.frindesId.length > 0) {
      await this.update(userfrindsData);
    } else {
      await this.remove(userfrindsData.userId);
    }
  }
}
