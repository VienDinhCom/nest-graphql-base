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
