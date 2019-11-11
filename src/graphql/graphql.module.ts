import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccessControlModule } from 'nest-access-control';
import { UserModule } from './user/user.module';
import { ContextType } from './graphql.context';
import { roles } from '../auth/auth.roles';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: __dirname + '/schema.gql',
      context: ({ req, res }): ContextType => ({ req, res }),
      playground: true,
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
  ],
})
export class GraphqlModule {}
