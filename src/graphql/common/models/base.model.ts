import { Field, ID, ObjectType } from 'type-graphql';
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

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ nullable: true })
  updatedAt: string;
}
