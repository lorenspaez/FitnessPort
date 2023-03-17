import { Post, Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { PagoService } from './pago.service';
import { JwtGuard } from '../auth/guard';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  createPago(
    @Body() dto: CreatePagoDto,
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
  ) {
    return this.pagoService.createPago(dto, userId, userName);
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

  @Get('fecha/today')
  getTodayPagos(){
    return this.pagoService.getTodayPagos();
  }

  @Get('fecha/week')
  getWeeklyPagos(){
    return this.pagoService.getWeeklyPagos();
  }

  @Get('fecha/month')
  getMonthlyPagos(){
    return this.pagoService.getMonthlyPagos();
  }
    
  @Patch('edit/:id')
  editPago(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePagoDto,
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    ) {
    return this.pagoService.editPago(id, dto, userId, userName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePagoByRut(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.pagoService.deletePagoByRut(id);
  }
}
