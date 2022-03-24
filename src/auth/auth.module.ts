import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/model/user.model';
import { MailService } from 'src/mail/mail.service';
import { jwtStrategy } from 'src/user/jwt_strategy';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthResolver, AuthService, UserService, MailService, jwtStrategy],
})
export class AuthModule {}
