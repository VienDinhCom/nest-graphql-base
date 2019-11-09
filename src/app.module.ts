import * as dotenv from 'dotenv';
import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GraphqlModule } from './graphql/graphql.module';

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
  imports: [DatabaseModule, HttpModule, AuthModule, GraphqlModule],
  controllers: [AppController],
})
export class AppModule {}
