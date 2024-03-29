import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import {UsersService} from '../users/services/users/users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../typeorm';
import {LocalStrategy} from './utils/LocalStrategy';
import {SessionSerializer} from './utils/SessionSerializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
