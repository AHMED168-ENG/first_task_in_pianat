import { Module } from '@nestjs/common';
import { UserFrindsService } from './user-frinds.service';
import { UserFrindsResolver } from './user-frinds.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFrind } from './models/user-frind.model';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { UserRequest } from 'src/user-request/models/user-request.model';
import { UserRequestService } from 'src/user-request/user-request.service';
import { UserRequestModule } from 'src/user-request/user-request.module';
import { jwtStrategy } from 'src/user/jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([UserFrind, User])],
  providers: [UserFrindsResolver, UserFrindsService, UserService, jwtStrategy],
})
export class UserFrindsModule {}
