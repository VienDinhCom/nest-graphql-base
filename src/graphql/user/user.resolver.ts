import * as async from 'async';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Users } from './user.model';
import { UserInput, UsersArgs } from './user.dto';
import { ContextType } from '../graphql.context';
import { GqlAuthGuard, UseRoles, Resources } from '../../auth/auth.guard';
import { FirebaseService } from '../../services/firebase.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  @UseRoles({
    resource: Resources.User,
    action: 'read',
    possession: 'own',
  })
  me(@Context() context: ContextType): User {
    return context.req.user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    const { fid } = context.req.user;

    const user = await this.userRepository.findOne({
      where: { fid },
    });

    if (user) throw new BadRequestException('User has been existed.');

    const firebaseUser = await this.firebaseService.updateUser(fid, data);

    return this.userRepository.save(Object.assign(new User(), firebaseUser));
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  @UseRoles({
    resource: Resources.User,
    action: 'update',
    possession: 'own',
  })
  async updateMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    const { fid } = context.req.user;
    const user = await this.userRepository.findOne({ where: { fid } });
    const firebaseUser = await this.firebaseService.updateUser(fid, data);

    return { ...user, ...firebaseUser };
  }

  @Query(() => Users)
  @UseGuards(GqlAuthGuard)
  @UseRoles({
    resource: Resources.User,
    action: 'read',
    possession: 'any',
  })
  async users(
    @Args() { limit, page }: UsersArgs,
    @Context() context: ContextType,
  ): Promise<Users> {
    const users = await paginate<User>(this.userRepository, {
      limit,
      page,
    });

    const items: User[] = await async.map(users.items, async user => {
      const firebaseUser = await this.firebaseService.getUser(user.fid);
      return { ...user, ...firebaseUser };
    });

    return { ...users, items };
  }
}
