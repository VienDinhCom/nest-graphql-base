import { Injectable } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { AuthGuard } from 'nest-graphql-guard';
import { Roles, Resources } from './auth.roles';

@Injectable()
export class GqlAuthGuard extends AuthGuard('firebase') {}

export { UseRoles, Roles, Resources };
