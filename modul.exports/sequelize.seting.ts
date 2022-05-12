import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { configrationSeting } from './configration.seting';

@Module({
  imports: [
    configrationSeting,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME2,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class sequelizeSeting {}
