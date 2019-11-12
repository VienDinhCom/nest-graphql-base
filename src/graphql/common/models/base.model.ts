import { validateOrReject } from 'class-validator';
import { UserInputError } from 'apollo-server-core';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export abstract class Base {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ nullable: true })
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, { validationError: { target: false } }).catch(
      errors => {
        throw new UserInputError('BAD_USER_INPUT', {
          [this.constructor.name]: errors,
        });
      },
    );
  }
}
