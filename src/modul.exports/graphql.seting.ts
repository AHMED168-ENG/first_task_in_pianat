import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';

var onLineUser = {};
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            if (connectionParams.Authorization) {
              const user = jwt.verify(
                connectionParams.Authorization.split(' ')[1],
                '123',
              );
              if (user) {
                var { userId }: any = user;
                onLineUser[userId] = {
                  id: userId,
                };
                return onLineUser;
              }
            }
          },
        },
        context: ({ connection }) => {
          console.log('connection');
        },
      },
    }),
  ],
})
export class GraphQLSeting {}
