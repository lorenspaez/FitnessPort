import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreatePagoDto {

  @IsString()
  @IsNotEmpty()
  customerRut: string;

  @IsNotEmpty()
  montoPagado: string;

  @IsNotEmpty()
  medioPago: string;

  @IsNotEmpty()
  descuentoEmpresa: string;

  @IsNotEmpty()
  vencimientoPago: string;
}