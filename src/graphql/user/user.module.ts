import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { FirebaseService } from '../../services/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FirebaseService, UserService, UserResolver],
})
export class UserModule {}
