import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${__dirname}/database.sqlite`,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    GraphqlModule,
  ],
})
export class AppModule {}
