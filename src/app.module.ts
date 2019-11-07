import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';

dotenv.config();

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const DatabaseModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
});

@Module({
  imports: [DatabaseModule, AuthModule, GraphqlModule],
})
export class AppModule {}
