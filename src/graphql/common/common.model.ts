import { Pagination as TypeORMPagination } from 'nestjs-typeorm-paginate';
import { Field, ID, ObjectType, Int } from 'type-graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export abstract class Base {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: string;
}

@ObjectType()
export abstract class Pagination<I> implements TypeORMPagination<I> {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  itemCount: number;

  items: I[];
}
