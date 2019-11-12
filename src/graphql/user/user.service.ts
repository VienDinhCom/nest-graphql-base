import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { User } from './models';
import { Roles } from '../../auth/auth.roles';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createUser(fid: string, data: Partial<User>) {
    const user = new User();
    const hasFirstUser = (await this.userRepository.find()).length;

    if (!hasFirstUser) {
      user.roles = [Roles.Administrator, Roles.Authenticated];
    }

    const hasFirebaseUser = await this.userRepository.findOne({
      where: { fid },
    });

    if (hasFirebaseUser) {
      throw new BadRequestException('User has been existed.');
    }

    const firebaseUser = await this.firebaseService.updateUser(fid, data);

    return this.userRepository.save(Object.assign(user, firebaseUser));
  }

  async updateUser(id: string, data: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.firebaseService.updateUser(user.fid, data);
    return this.userRepository.save(Object.assign(user, data));
  }

  async getUser(searchOptions: FindConditions<User>) {
    return this.userRepository.findOne(searchOptions);
  }

  async getUsers(
    limit: number,
    page: number,
    searchOptions?: FindConditions<User>,
  ) {
    return paginate<User>(this.userRepository, { limit, page }, searchOptions);
  }
}
