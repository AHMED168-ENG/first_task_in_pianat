import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';
import { GraphQLUpload } from 'graphql-upload';

var onLineUser = {};
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
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
