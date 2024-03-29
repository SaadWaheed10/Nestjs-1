import { NestMiddleware, Injectable } from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware 
{
  use(req: Request, res: Response, next: NextFunction)
  {
    const { valid } = req.headers;
    console.log(valid);
    console.log('ValidateCustomerAccount!');
    if(valid) 
    {
      next();
    }

    else 
    {
      res.status(401).send({error:'Account is Invalid!'});
    }
  }
}
