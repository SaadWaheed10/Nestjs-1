import { Injectable } from '@nestjs/common';
import {User, SerializedUser} from '../../Types/index';
import { plainToClass } from 'class-transformer';
import {CreateUserDto} from '../../dto/CreateUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User as UserEntity} from '../../../typeorm/User';
import {Repository} from 'typeorm';
import {encodePassword} from '../../../utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository (UserEntity) private readonly userRepository: Repository<UserEntity>){}

  private users: User[] = [];

  getUsers() {
    return this.users.map((user)=> new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto:CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({...createUserDto, password});
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) 
  {
    return this.userRepository.findOne({where: {username: username}})
  }

  findUserById(id: number)
  {
    return this.userRepository.findOne({where: {id: id}});
  }
}
