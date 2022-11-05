import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateSheetDto {

  @IsString()
  @IsNotEmpty()
  customerRut: string;

  @IsOptional()
  peso: string;

  @IsOptional()
  edad: string;

}
