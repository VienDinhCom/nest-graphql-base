import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Users } from './models';
import { UserService } from './user.service';
import { UserInput, UsersArgs } from './dto';
import { ContextType } from '../graphql.context';
import { UserCan, Resources } from '../../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UserCan({ action: 'read', possession: 'own', resource: Resources.User })
  me(@Context() context: ContextType): User {
    return context.req.user;
  }

  @Mutation(() => User)
  @UserCan()
  async createMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    return this.userService.createUser(context.req.user.fid, data);
  }

  @Mutation(() => User)
  @UserCan({ action: 'update', possession: 'own', resource: Resources.User })
  async updateMe(
    @Args('data') data: UserInput,
    @Context() context: ContextType,
  ): Promise<User> {
    return this.userService.updateUser(context.req.user.id, data);
  }

  @Query(() => Users)
  @UserCan({ action: 'read', possession: 'any', resource: Resources.User })
  async users(@Args() { limit, page }: UsersArgs): Promise<Users> {
    return this.userService.getUsers(limit, page);
  }
}
