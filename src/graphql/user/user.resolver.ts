import { Repository } from 'typeorm';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserInput } from './user.dto';
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

  @Query(() => Boolean)
  async userExistsByFid(@Args('fid') fid: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { fid } });
    return user ? true : false;
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

    if (user) throw new BadRequestException('User has been created.');

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

  // @Query(() => [User])
  // @UseGuards(GqlAuthGuard)
  // users(@Context() context: any): Promise<User[]> {
  //   console.log(context.req.user);

  //   return this.userRepository.find();
  // }
}
