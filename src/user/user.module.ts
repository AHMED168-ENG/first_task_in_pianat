import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { jwtStrategy } from './jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserResolver, UserService, jwtStrategy],
})
export class UserModule {}
