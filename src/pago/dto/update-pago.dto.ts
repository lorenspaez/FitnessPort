import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {

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
