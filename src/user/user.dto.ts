import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(30)
  name: string;
}
