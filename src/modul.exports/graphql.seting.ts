import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      subscriptions: {
        installSubscriptionHandlers: true,
        onConnect: (connectionParams) => {
          console.log(connectionParams);
          console.log('connectionParams');
          const authToken = connectionParams.authToken;
          /*           if (!isValid(authToken)) {
            throw new Error('Token is not valid');
          }
          // extract user information from token
          const user = parseToken(authToken);
          // return user info to add them to the context later 
          return { user };*/
        },
      },
      context: ({ connection }) => {
        // connection.context will be equal to what was returned by the "onConnect" callback
      },
    }),
  ],
})
export class GraphQLSeting {}
