import { Entity, Column } from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Base, Pagination } from '../common/common.model';

enum Role {
  Authenticated = 'Authenticated',
  Administrator = 'Administrator',
}

registerEnumType(Role, { name: 'Role' });

// https://stackoverflow.com/questions/51969492/how-to-combine-multiple-property-decorators-in-typescript
// function FirebaseIdField<T>() {
//   const fieldFn = Field();
//   const columnFn = Column({ unique: true });

//   return function(target: T, key: string) {
//     fieldFn(target, key);
//     columnFn(target, key);
//   };
// }

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

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role })
  role: Role = Role.Authenticated;

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
