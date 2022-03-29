import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PubSub } from 'graphql-subscriptions';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { operation_request_input } from './dto/operation-request.input';
import { UserRequest } from './models/user-request.model';
const pobSup = new PubSub();

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(UserRequest) private userRequest: typeof UserRequest,
    private readonly userFrindsService: UserFrindsService,
    private readonly userService: UserService,
  ) {}
  /*--------------- start requestOperation function ----------------------------------------*/
  async requestOperation(operation_request_input) {
    var userfrinds = await this.userFrindsService.findOne(
      operation_request_input.from,
    );
    var frindfrinds = await this.userFrindsService.findOne(
      operation_request_input.to,
    );
    var userRequests = await this.findRequest(operation_request_input.to);
    if (!userRequests) {
      if (frindfrinds) {
        if (
          this.userFrindsService.ifFindInUserFrindes(
            operation_request_input.from,
            frindfrinds,
          )
        ) {
          await this.userFrindsService.removeUserFrind(
            userfrinds,
            operation_request_input.to,
          );
          await this.userFrindsService.removeUserFrind(
            frindfrinds,
            operation_request_input.from,
          );
          return 'F_Removed';
        }
      }
      return await this.createRequest(operation_request_input);
    } else {
      if (
        this.ifRequestInUserRequest(operation_request_input.from, userRequests)
      ) {
        return await this.removeUserRequest(
          userRequests,
          operation_request_input,
        );
      } else {
        if (frindfrinds) {
          if (
            this.userFrindsService.ifFindInUserFrindes(
              operation_request_input.from,
              frindfrinds,
            )
          ) {
            await this.userFrindsService.removeUserFrind(
              userfrinds,
              operation_request_input.to,
            );
            await this.userFrindsService.removeUserFrind(
              frindfrinds,
              operation_request_input.from,
            );
            return 'F_Removed';
          }
        }
        pobSup.publish('addRequest', operation_request_input.to);
        return await this.createRequestInUserRequest(
          userRequests,
          operation_request_input,
        );
      }
    }
  }
  /*--------------- end requestOperation function ----------------------------------------*/

  /*--------------- start createRequest function ----------------------------------------*/
  async createRequest(operation_request_input): Promise<string> {
    await this.userRequest.create({
      to: operation_request_input.to,
      from: [operation_request_input.from],
      date: [Date.now()],
      isSeen: [false],
    });
    return 'R_Added';
  }
  /*--------------- end createRequest function ----------------------------------------*/

  /*--------------- start createRequestInUserRequest function ----------------------------------------*/
  async createRequestInUserRequest(userRequests, operation_request_input) {
    var userRequestsData = userRequests.toJSON();
    userRequestsData.from.push(operation_request_input.from);
    userRequestsData.date.push(Date.now());
    userRequestsData.isSeen.push(false);
    await this.updateRequest(userRequestsData);
    return 'R_Added';
  }
  /*--------------- end createRequest function ----------------------------------------*/

  /*--------------- start findrequestThatSeen function ----------------------------------------*/
  async findrequestUsers(to: string) {
    var userRequest = await this.findRequest(to);
    var userRequestData = userRequest.toJSON();
    var requestNotSeen = [];
    userRequestData.from.forEach((ele, i) => {
      requestNotSeen.push(ele);
    });
    return await this.userService.findAllInclude(requestNotSeen);
  }
  /*--------------- end findrequestThatSeen function ----------------------------------------*/
  /*--------------- start findrequestThatSeen function ----------------------------------------*/
  async findrequestThatNotSeen(to: string) {
    var userRequest = await this.findRequest(to);
    var userRequestData = userRequest.toJSON();
    var requestNotSeen = [];
    userRequestData.isSeen.forEach((ele, i) => {
      if (!ele) {
        requestNotSeen.push(userRequestData.from[i]);
      }
    });
    return await this.userService.findAllInclude(requestNotSeen);
  }
  /*--------------- end findrequestThatSeen function ----------------------------------------*/

  /*--------------- start findRequest function ----------------------------------------*/
  async findRequest(to: string) {
    return await this.userRequest.findOne({
      where: {
        to: to,
      },
    });
  }
  /*--------------- end findRequest function ----------------------------------------*/

  /*--------------- start ifRequestInUserRequest function ----------------------------------------*/
  ifRequestInUserRequest(from: string, userRequests) {
    if (userRequests.from.includes(from)) {
      return true;
    } else {
      return false;
    }
  }
  /*--------------- end ifRequestInUserRequest function ----------------------------------------*/

  /*--------------- start updateRequest function ----------------------------------------*/
  async updateRequest(operation_request_input) {
    return await this.userRequest.update(operation_request_input, {
      where: {
        to: operation_request_input.to,
      },
    });
  }
  /*--------------- end updateRequest function ----------------------------------------*/

  /*--------------- start removerequest function ----------------------------------------*/
  removerequest(to: string) {
    return this.userRequest.destroy({
      where: {
        to: to,
      },
    });
  }
  /*--------------- end removerequest function ----------------------------------------*/

  /*--------------- start removeUserRequest function ----------------------------------------*/
  async removeUserRequest(userRequests, operation_request_input) {
    var userRequestsData = userRequests.toJSON();
    userRequestsData.date.splice(
      userRequestsData.from.indexOf(operation_request_input.from),
      1,
    );
    userRequestsData.isSeen.splice(
      userRequestsData.from.indexOf(operation_request_input.from),
      1,
    );
    userRequestsData.from.splice(
      userRequestsData.from.indexOf(operation_request_input.from),
      1,
    );
    if (userRequestsData.from.length > 0) {
      await this.updateRequest(userRequestsData);
    } else {
      await this.removerequest(userRequestsData.to);
    }
    return 'R_Removed';
  }
  /*--------------- end removeUserRequest function ----------------------------------------*/

  /*--------------- start requestOperation function ----------------------------------------*/
  async acceptRequest(operation_Frindes) {
    var frindfrinds = await this.userFrindsService.findOne(
      operation_Frindes.from,
    );
    var userfrinds = await this.userFrindsService.findOne(operation_Frindes.to);
    var userRequest = await this.findRequest(operation_Frindes.to);

    if (!userfrinds) {
      await this.userFrindsService.create(
        operation_Frindes.to,
        operation_Frindes.from,
      );
    } else {
      await this.userFrindsService.createNewFrind({
        userId: operation_Frindes.to,
        frindesId: operation_Frindes.from,
      });
    }
    if (!frindfrinds) {
      await this.userFrindsService.create(
        operation_Frindes.from,
        operation_Frindes.to,
      );
    } else {
      await this.userFrindsService.createNewFrind({
        frindesId: operation_Frindes.to,
        userId: operation_Frindes.from,
      });
    }
    await this.removeUserRequest(userRequest, operation_Frindes);
    return 'F_Added';
  }
  /*--------------- end requestOperation function ----------------------------------------*/

  /*--------------- start change seen function ----------------------------------------*/
  async changeSeenRequest(to: string) {
    try {
      var userRequest = await this.findRequest(to);
      if (!userRequest) return 'update successful';
      var isSeenArr = [];
      var userRequestData = userRequest.toJSON();
      userRequestData.isSeen.forEach((ele) => {
        isSeenArr.push(true);
      });
      userRequestData.isSeen = isSeenArr;
      await this.updateRequest(userRequestData);
      return 'All_Seen';
    } catch (error) {}
  }
  /*--------------- end change seen function ----------------------------------------*/
}
