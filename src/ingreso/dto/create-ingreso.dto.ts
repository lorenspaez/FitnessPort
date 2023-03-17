import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class CreateIngresoDto {

  @IsString()
  @IsNotEmpty()
  customerRut: string;
}
