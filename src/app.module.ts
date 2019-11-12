import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { sqliteConfig } from './config/sqlite.config';
import { GraphqlModule } from './graphql/graphql.module';

const DatabaseModule = TypeOrmModule.forRoot({
  ...sqliteConfig,
  synchronize: true,
  entities: [__dirname + '/**/*.model{.ts,.js}'],
});

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule, GraphqlModule],
  controllers: [AppController],
})
export class AppModule {}
