import { Min, Max } from 'class-validator';
import { Field, ArgsType, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  @Min(1)
  @Max(20)
  limit: number = 10;

  @Field(() => Int)
  page: number = 1;
}
