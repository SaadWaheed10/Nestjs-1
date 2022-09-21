import { Controller, Post, Get, UseGuards, Session, Req } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LocalAuthGuard} from '../../utils/LocalGuard';
import {AuthenticatedGuard} from '../../utils/LocalGuard';
import {Request} from 'express';

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request)
  {
    return req.user;
  }
}
