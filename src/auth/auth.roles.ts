import { RolesBuilder } from 'nest-access-control';
export const roles: RolesBuilder = new RolesBuilder();

export enum Roles {
  Authenticated = 'Authenticated',
  Administrator = 'Administrator',
}

export enum Resources {
  User = 'User',
}

roles
  .grant(Roles.Authenticated)
  .readOwn(Resources.User)
  .updateOwn(Resources.User);

roles.grant(Roles.Administrator).readAny(Resources.User);
