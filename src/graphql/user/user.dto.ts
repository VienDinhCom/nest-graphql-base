import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;
}
