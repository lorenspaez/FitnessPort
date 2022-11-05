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
  peso: number;

  @IsOptional()
  edad: number;

}
