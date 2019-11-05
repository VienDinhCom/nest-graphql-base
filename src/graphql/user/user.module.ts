import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver],
})
export class UserModule {}
