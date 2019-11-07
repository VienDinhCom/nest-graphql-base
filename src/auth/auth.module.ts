import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../graphql/user/user.model';
import { AuthStrategy } from './auth.strategy';
import { FirebaseService } from '../services/firebase.service';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy, FirebaseService],
})
export class AuthModule {}
