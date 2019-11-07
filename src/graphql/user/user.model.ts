import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Base, Pagination } from '../common/common.model';

@Entity()
@ObjectType()
export class User extends Base {
  @Field()
  @Column({ unique: true })
  fid: string;

  @Field()
  email: string;

  @Field()
  verified: boolean;

  @Field()
  name: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  phone: string;
}

@ObjectType()
export class Users extends Pagination<User> {
  @Field(() => User)
  items: User[];
}
