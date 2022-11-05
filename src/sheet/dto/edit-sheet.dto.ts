import {
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';
  
export class EditSheetDto {
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
