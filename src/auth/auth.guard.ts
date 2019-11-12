import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'nest-graphql-guard';
import { UseRoles, Role } from 'nest-access-control';
import { Resources } from './auth.roles';

function UserCan(...roles: Role[]) {
  return (target: any, propertyKey: string, descriptor: any) => {
    UseGuards(AuthGuard('firebase'))(target, propertyKey, descriptor);
    UseRoles(...roles)(target, propertyKey, descriptor);
  };
}

export { UserCan, Resources };
