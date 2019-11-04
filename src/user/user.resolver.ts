import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserInput } from './user.dto';

@Injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(() => User)
  createUser(@Args('data') data: UserInput): Promise<User> {
    const user = new User();
    return this.userRepository.save({ ...user, ...data });
  }
}
