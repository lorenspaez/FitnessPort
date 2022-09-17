import {
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateIngresoDto {

  @IsString()
  @IsNotEmpty()
  rut: string;
}
