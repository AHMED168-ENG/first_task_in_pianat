import { Module } from '@nestjs/common';
import { join } from 'path';
import { configrationSeting } from './modul.exports/configration.seting';
import { GraphQLSeting } from './modul.exports/graphql.seting';
import { sequelizeSeting } from './modul.exports/sequelize.seting';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modul.exports/role.guard';
import { ConversationModule } from './conversation/conversation.module';
import { UserMessageModule } from './user-message/user-message.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    configrationSeting,
    GraphQLSeting,
    sequelizeSeting,
    UserModule,
    AuthModule,
    ConversationModule,
    UserMessageModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
