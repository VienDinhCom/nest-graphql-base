import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: string;
}
