import {
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditSheetDto {
    @IsOptional()
    peso: number;
  
    @IsOptional()
    edad: number;

  }
  