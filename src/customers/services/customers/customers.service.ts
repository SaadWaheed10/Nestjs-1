import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import {Customer} from '../../types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'ali@gmail.com',
      name: 'Ali Waheed',
    },
    {
      id: 2,
      email: 'umar@gmail.com',
      name: 'Umar Waheed',
    },
    {
      id: 3,
      email: 'hussain@gmail.com',
      name: 'Hussain Waheed',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
