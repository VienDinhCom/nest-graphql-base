import { Entity } from 'typeorm';
import { ObjectType, registerEnumType } from 'type-graphql';
import { Roles } from '../../../auth/auth.roles';
import {
  Base,
  EmailField,
  ImageField,
  BooleanField,
  TextField,
  FIDField,
  PhoneField,
  EnumArrayField,
} from '../../common';

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
