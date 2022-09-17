import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateCustomerDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsString()
  @IsOptional()
  planType?: string;

}
