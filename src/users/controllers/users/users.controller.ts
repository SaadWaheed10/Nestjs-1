import { Controller, Get, Inject, Param, HttpException, HttpStatus, ClassSerializerInterceptor, UseInterceptors, ParseIntPipe, NotFoundException, UseFilters, Post, Body, UsePipes, ValidationPipe,UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../Types/index';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import {HttpExceptionFilter} from '../../filters/HttpException.filter';
import {CreateUserDto} from '../../dto/CreateUser.dto';
import {AuthenticatedGuard} from '../../../auth/utils/LocalGuard';

@Controller('users')
export class UsersController {

  constructor(
     @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)  
  @Get('')
  getUsers() 
  {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getUserByUsername(@Param('username') username:string)
  {
    const user = this.userService.getUserByUsername(username);
    if(user) return new SerializedUser(user);
    else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id:number)
  {
    const user = this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else
    {
      throw new UserNotFoundException();
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) 
  {
    return this.userService.createUser(createUserDto);
  }
}

