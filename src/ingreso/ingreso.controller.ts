import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto, UpdateIngresoDto} from './dto';

@UseGuards(JwtGuard)
@Controller('ingresos')
export class IngresoController {
  constructor(private ingresoService: IngresoService) {}

  @Post()
  createIngreso(
    @Body() dto: CreateIngresoDto
  ) {
    return this.ingresoService.createIngreso(dto);
  }

  @Get()
  getAllIngresos() {
    return this.ingresoService.getAllIngresos();
  }

  @Get(':id')
  getIngresoById(
    @Param('id', ParseIntPipe) ingresoId: number,
  ) {
    return this.ingresoService.getIngresoById(ingresoId);
  }

  @Get('today')
  getTodayIngresos(){
    return this.ingresoService.getTodayIngresos();
  }

  @Get('customer/:customerRut')
  getIngresosByRut(
    @Param('customerRut') customerRut: string,
  ) {
    return this.ingresoService.getIngresosByRut(customerRut);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteIngresoByKey(
    @Param('id', ParseIntPipe) ingresoId: number,
  ) {
    return this.ingresoService.deleteIngreso(ingresoId);
  }
}
