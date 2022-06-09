import { Module, ValidationPipe } from '@nestjs/common';
import { configrationSeting } from 'modul.exports/configration.seting';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
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
import { GraphQLSeting } from 'modul.exports/graphql.seting';

@Module({
  imports: [
    configrationSeting,
    GraphQLSeting,
    sequelizeSeting,
    MailModule,
    UserModule,
    AuthModule,
    ConversationModule,
    UserMessageModule,
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
  ],
})
export class AppModule {}
