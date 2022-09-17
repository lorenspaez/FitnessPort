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
    customerRut: string
  ) {
    return this.ingresoService.createIngreso(customerRut);
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

  @Get('customer')
  getIngresosByRut(
    rut: string,
  ) {
    return this.ingresoService.getIngresosByRut(rut);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteIngresoByKey(
    @Param('id', ParseIntPipe) ingresoId: number,
  ) {
    return this.ingresoService.deleteIngreso(ingresoId);
  }
}
