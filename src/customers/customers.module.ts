import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './Middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './Middlewares/validate-customer-account.middleware';
import {Request, Response, NextFunction} from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule 
{
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware,
      (req:Request, res:Response, next: NextFunction) => 
      {
        console.log('Last Middleware');
        next();
      },
    )
    
    .exclude
    (
      {
      path: 'api/customers/create',
      method: RequestMethod.POST,
      },
      {
      path: 'api/customers',
      method: RequestMethod.GET,
      },
    )
    .forRoutes(CustomersController);
  }
}
