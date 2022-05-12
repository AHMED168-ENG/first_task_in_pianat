import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ConversationModule } from './conversation/conversation.module';
import { UserMessageModule } from './user-message/user-message.module';
import { MailModule } from './mail/mail.module';
import { UserRequestModule } from './user-request/user-request.module';
import { UserFrindsModule } from './user-frinds/user-frinds.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { PostReactionModule } from './post-reaction/post-reaction.module';
import { RolesGuard } from 'modul.exports/role.guard';
import { sequelizeSeting } from 'modul.exports/sequelize.seting';
import { configrationSeting } from 'modul.exports/configration.seting';
import { GraphQLSeting } from 'modul.exports/graphql.seting';
import { UploadImage } from './scalars/upload';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    configrationSeting,
    GraphQLSeting,
    sequelizeSeting,
    UserModule,
    AuthModule,
    ConversationModule,
    UserMessageModule,
    MailModule,
    UserRequestModule,
    UserFrindsModule,
    PostModule,
    CommentsModule,
    PostReactionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UploadImage,
  ],
})
export class AppModule {}
