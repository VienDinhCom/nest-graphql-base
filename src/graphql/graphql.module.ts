import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: __dirname + '/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
  ],
})
export class GraphqlModule {}
