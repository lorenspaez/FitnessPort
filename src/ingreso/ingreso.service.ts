import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngresoService {
  constructor(private prisma: PrismaService) {}

  async createIngreso(customerRut: string){
    const customer = await this.prisma.customer.findUnique({
      where:{
        rut: customerRut
      },
    });

    const ingreso = await this.prisma.ingreso.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
        customerRut: customer.rut
      },
    });

    delete ingreso.updatedAt;
    delete ingreso.id;
    delete ingreso.customerId;

    return ingreso;
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

  getIngresosByRut(
    Rut: string,
  ) {
    return this.prisma.ingreso.findMany({
      where: {
        customerRut: Rut
      },
    });
  }

  getTodayIngresos(){
    
  }

  async deleteIngreso(ingresoId: number) {
    return await this.prisma.ingreso.delete({
      where:{
        id: ingresoId
      },
    });
  }

}
