import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    userName?: string;
  
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    photo?: string;
  }
  