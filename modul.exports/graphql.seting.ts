import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';
import { configrationSeting } from './configration.seting';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

var onLineUser = {};
@Module({
  imports: [
    configrationSeting,
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
