import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './models/posts.model';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { UserFrind } from 'src/user-frinds/models/user-frind.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model/user.model';
import { UploadImage } from 'src/scalars/upload';

@Module({
  imports: [SequelizeModule.forFeature([Posts, UserFrind, User])],
  providers: [
    PostResolver,
    PostService,
    UserFrindsService,
    UserService,
    UploadImage,
  ],
})
export class PostModule {}
