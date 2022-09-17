import {
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditCustomerDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    rut?: string;

    @IsString()
    @IsOptional()
    planType?: string;

  }
  