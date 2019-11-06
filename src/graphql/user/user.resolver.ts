import { Repository } from 'typeorm';
import { UseGuards, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserInput } from './user.dto';
import { GqlAuthGuard } from '../../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@Context() context: any): Promise<User[]> {
    return context.req.user;
  }

  // @Query(() => [User])
  // @UseGuards(GqlAuthGuard)
  // users(@Context() context: any): Promise<User[]> {
  //   console.log(context.req.user);

  //   return this.userRepository.find();
  // }

  // @Mutation(() => User)
  // createUser(@Args('data') data: UserInput): Promise<User> {
  //   const user = new User();
  //   return this.userRepository.save({ user, ...data });
  // }
}
