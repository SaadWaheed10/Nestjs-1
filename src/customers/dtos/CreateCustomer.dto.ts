import {IsEmail, IsNotEmpty, IsNumberString, ValidateNested, IsNotEmptyObject} from 'class-validator';
import {CreateAddressDto} from './CreateAddress.dto';
import {Type} from 'class-transformer';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
