import {
  HttpException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );

  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  // app.use(graphqlUploadExpress());
  await app.listen(4000);
}
bootstrap();
