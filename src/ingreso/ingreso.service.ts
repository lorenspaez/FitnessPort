import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngresoService {
  constructor(private prisma: PrismaService) {}

  async createIngreso(dto: CreateIngresoDto){

    const customer = await this.prisma.customer.findUnique({
      where:{
        rut: dto.customerRut
      },
    });

    if(customer.id == null){
      throw new ForbiddenException(
        'Ese RUT no esta registrado',
      );
    };

    if(customer.isActive == true){
      return await this.prisma.ingreso.create({
        data:{
          customerId: customer.id,
          customerName: customer.name,
          //correctAccess: true,
          ...dto
        },
      });  
    };

    return await this.prisma.ingreso.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
        //correctAccess: false,
        ...dto
      },
    });        
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

  async getTodayIngresos(){
    return await this.prisma.ingreso.findMany({
      /*take: 10*()*/
      where:{
        createdAt:{
          gte: '2022'
        },
      },
    });
  }

  async deleteIngreso(ingresoId: number) {
    return await this.prisma.ingreso.delete({
      where:{
        id: ingresoId
      },
    });
  }
}
