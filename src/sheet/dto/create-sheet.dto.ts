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

  @IsOptional()
  sexo: string;

  @IsOptional()
  porcMusculo: string;

  @IsOptional()
  porcGrasa: string;

  @IsOptional()
  estatura: string;

  @IsOptional()
  grasaVisceral: string;

  @IsOptional()
  calorias: string;
}
