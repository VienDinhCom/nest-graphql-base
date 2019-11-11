import { Field, ObjectType } from 'type-graphql';
import { Pagination } from '../../common';
import { User } from './user.model';

@ObjectType()
export class Users extends Pagination<User> {
  @Field(() => User)
  items: User[];
}
