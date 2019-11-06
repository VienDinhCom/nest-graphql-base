import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../graphql/user/user.model';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseService } from '../services/firebase.service';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [FirebaseStrategy, FirebaseService],
})
export class AuthModule {}
