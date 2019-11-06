import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './firebase.strategy';
import { User } from '../graphql/user/user.model';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [FirebaseStrategy],
})
export class AuthModule {}
