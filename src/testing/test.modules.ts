import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { UserFrind } from 'src/user-frinds/models/user-frind.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model/user.model';
import { testService } from './test.service';

@Global()
@Module({
  imports: [],
  providers: [testService],
  exports: [testService],
})
export class testModule {}
