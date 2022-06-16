import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';

var onLineUser = {};
@Module({
  imports: [
    GraphQLModule.forRoot({
      // uploads: false,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
      },
      uploads: {
        maxFileSize: 10000000000, // 10 MB
        maxFiles: 5,
        path: '/public',
      },

      subscriptions: {
        'subscriptions-transport-ws': {},
        context: ({ connection }) => {
          console.log('connection');
        },
      },
    }),
  ],
})
export class GraphQLSeting {}
