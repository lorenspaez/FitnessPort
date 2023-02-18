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
  nationality: string;
  
  @IsString()
  birthday: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  planType?: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsString()
  @IsOptional()
  objective?: string;

  @IsString()
  @IsOptional()
  agreement?: string;
}
