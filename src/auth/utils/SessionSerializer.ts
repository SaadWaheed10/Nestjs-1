import {Inject} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import {UsersService} from '../../users/services/users/users.service';
import {User} from '../../typeorm/User';

export class SessionSerializer extends PassportSerializer 
{
  constructor(@Inject('USER_SERVICE') private readonly userService: UsersService)
  {
    super();
  }

  serializeUser(user: User, done: (err, user:User) => void) 
  {
    console.log('Serialized User');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user:User) => void) 
  {
    console.log('Deserialized User');
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
