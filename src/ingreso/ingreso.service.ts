import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngresoService {
  constructor(private prisma: PrismaService) {}

  async createIngreso(dto){

  }

  getAllIngresos() {
    return this.prisma.ingreso.findMany({
      where: {
      },
    });
  }

  getIngresoById(
    ingresoId: number,
  ) {
    return this.prisma.ingreso.findFirst({
      where: {
        id: ingresoId
      },
    });
  }

  async editIngresoByKey(
    IngresoKey: string,
    dto: UpdateIngresoDto,
  ) {
  }

  async deleteIngreso(
    alertKey: string,
  ) {
  }
}
