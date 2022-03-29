import { Module } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { UserRequestResolver } from './user-request.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRequest } from './models/user-request.model';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { UserFrind } from 'src/user-frinds/models/user-frind.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model/user.model';
import { jwtStrategy } from 'src/user/jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([UserRequest, UserFrind, User])],
  providers: [
    UserRequestResolver,
    UserRequestService,
    UserFrindsService,
    UserService,
    jwtStrategy,
  ],
})
export class UserRequestModule {}
