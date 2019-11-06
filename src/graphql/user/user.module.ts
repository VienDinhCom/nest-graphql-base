import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { FirebaseService } from '../../services/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, FirebaseService],
})
export class UserModule {}
