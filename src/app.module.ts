import { Module } from '@nestjs/common';
import {CustomersModule} from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {PassportModule} from '@nestjs/passport';
import entities from './typeorm';

@Module({
  imports: [CustomersModule, UsersModule, TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5440',
    database: 'tutorial_db',
    entities,
    synchronize: true,
  }), 
  AuthModule,
  PassportModule.register({
    session: true,
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
