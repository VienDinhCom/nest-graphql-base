import { Field, InputType, ArgsType } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { PaginationArgs } from '../common/common.dto';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  name?: string;

  @Field({ nullable: true })
  image?: string;
}

@ArgsType()
export class UsersArgs extends PaginationArgs {}
