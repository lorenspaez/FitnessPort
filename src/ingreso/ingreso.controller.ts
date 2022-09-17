import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto, UpdateIngresoDto} from './dto';

@UseGuards(JwtGuard)
@Controller('ingresos')
export class IngresoController {
  constructor(private ingresoService: IngresoService) {}

  @Post()
  createIngreso(
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    alertCategoryName: string,
    @Body() dto: CreateIngresoDto,
  ) {
    return this.ingresoService.createIngreso(dto);
  }

  @Get()
  getAllIngresos() {
    return this.ingresoService.getAllIngresos();
  }

  @Get(':id')
  getIngresoById(
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.ingresoService.getIngresoById(alertId);
  }

  @Patch('key/:alertKey')
  editIngresoByKey(
    @Param('alertKey') alertKey: string,
    @Body() dto: UpdateIngresoDto,
  ) {
    return this.ingresoService.editIngresoByKey(alertKey, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('key/:alertKey')
  deleteIngresoByKey(
    @Param('alertKey') alertKey: string,
  ) {
    return this.ingresoService.deleteIngreso(alertKey);
  }
}
