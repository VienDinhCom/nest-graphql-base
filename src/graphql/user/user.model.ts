import { Entity, Column } from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import {
  Base,
  Pagination,
  EmailField,
  ImageField,
  BooleanField,
  TextField,
  FIDField,
  PhoneField,
  EnumArrayField,
} from '../common';
import { Roles } from '../../auth/auth.roles';

registerEnumType(Roles, { name: 'Roles' });

@Entity()
@ObjectType()
export class User extends Base {
  @FIDField()
  fid: string;

  @EmailField()
  email: string;

  @BooleanField()
  verified: boolean;

  @TextField()
  name: string;

  @EnumArrayField(Roles)
  roles: Roles[] = [Roles.Authenticated];

  @ImageField(true)
  image: string;

  @PhoneField(true)
  phone: string;
}

@ObjectType()
export class Users extends Pagination<User> {
  @Field(() => User)
  items: User[];
}
