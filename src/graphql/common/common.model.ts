import { Pagination as TypeORMPagination } from 'nestjs-typeorm-paginate';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Pagination<I> implements TypeORMPagination<I> {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  itemCount: number;

  items: I[];
}
