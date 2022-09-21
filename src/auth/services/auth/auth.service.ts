import { Injectable, Inject } from '@nestjs/common';
import {UsersService} from '../../../users/services/users/users.service';
import {comparePasswords} from '../../../utils/bcrypt';

@Injectable()
export class AuthService 
{

  constructor(@Inject('USER_SERVICE') private readonly userService: UsersService,){}

  async validateUser(username: string, password: string)
  {
    console.log('Inside ValidateUser');
    const userDB = await this.userService.findUserByUsername(username);
    if(userDB) 
    {
      const matched = comparePasswords(password, userDB.password);
      if(matched)
      {
      console.log('User Validation Success!');
      return userDB;
      }
      else
      {
        console.log('Password do not match!');
        return null;
      }
    }
    console.log('User Validation Failed!');
    return null;
  }
}
