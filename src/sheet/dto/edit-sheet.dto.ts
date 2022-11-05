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

  }
  