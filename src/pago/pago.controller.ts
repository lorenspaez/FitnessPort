import { Post, Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { PagoService } from './pago.service';
import { JwtGuard } from '../auth/guard';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@UseGuards(JwtGuard)
@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  createPago(
    @Body() dto: CreatePagoDto,
  ) {
    return this.pagoService.createPago(dto);
  }

  @Get(':rut')
  getPagoByRut(
    @Param('rut') rut: string
  ){
    return this.pagoService.getPagoByRut(rut);
  }

  @Get()
  getAllPagos() {
    return this.pagoService.getAllPagos();
  }
    
  @Patch('edit/:rut')
  editPago(
    @Param('rut') rut: string,
    @Body() dto: UpdatePagoDto
    ) {
    return this.pagoService.editPago(rut, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePagoByRut(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.pagoService.deletePagoByRut(id);
  }
}
