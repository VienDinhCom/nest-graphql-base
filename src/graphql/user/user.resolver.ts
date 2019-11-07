import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Users } from './user.model';
import { UserInput, UsersArgs } from './user.dto';
import { ContextType } from '../graphql.context';
import { GqlAuthGuard } from '../../auth/auth.guard';
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
  me(@Context() context: ContextType): User {
    return context.req.user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    const firebaseUser = context.req.user;

    let user = await this.userRepository.findOne({
      where: { fid: firebaseUser.fid },
    });

    if (user) throw new BadRequestException('User has been existed.');

    user = await this.userRepository.save({
      ...new User(),
      ...firebaseUser,
      ...data,
    });

    await this.firebaseService.auth().updateUser(firebaseUser.fid, {
      displayName: data.name,
      photoURL: data.image,
    });

    return user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    const currentUser = context.req.user;

    await this.firebaseService.auth().updateUser(currentUser.fid, {
      displayName: data.name,
      photoURL: data.image,
    });

    return { ...currentUser, ...data };
  }

  @Query(() => Users)
  async users(@Args() { limit, page }: UsersArgs): Promise<Users> {
    return paginate<User>(this.userRepository, { limit, page });
  }
}
