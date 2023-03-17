import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngresoService {
  constructor(private prisma: PrismaService) {}

  async createIngreso(dto: CreateIngresoDto, userId: number, userName: string){
    const customer = await this.prisma.customer.findUnique({
      where:{
        rut: dto.customerRut
      },
    });

    if(!customer){
      throw new ForbiddenException(
        'Ese RUT no esta registrado',
      );
    };

    if(customer.isActive == true){
      return await this.prisma.ingreso.create({
        data:{
          customerId: customer.id,
          customerName: customer.name,
          correctAccess: true,
          adminId: userId,
          adminName: userName,
          ...dto
        },
      });  
    };

    return await this.prisma.ingreso.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
        correctAccess: false,
        adminId: userId,
        ...dto
      },
    });        
  }

  getAllIngresos() {
    return this.prisma.ingreso.findMany({
      where: {
      },
      orderBy:{
        createdAt: 'desc'
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
      take: 30,
      where: {
        customerRut: Rut
      },
      orderBy:{
        createdAt: 'desc'
      },
    });
  }

  async getTodayIngresos(){
    let today = new Date().toISOString().slice(0, 10);
    let today_ = new Date(today);
    return await this.prisma.ingreso.findMany({
      where:{
        createdAt:{
          gte: today_,
          
        },
      },
      orderBy:{
        createdAt: 'desc'
      },
    });
  }

  async getWeeklyIngresos(){

    let today = new Date();
    let lastday = today.getDate() - (today.getDay() - 1) + 6;
    let sunday =  new Date(today.setDate(lastday));
    let monday = new Date(sunday.getDate() - (today.getDay() - 6));
    console.log(sunday);
    console.log(monday);
    return await this.prisma.ingreso.findMany({
      where:{
        createdAt:{
          gte: monday,
          lte: sunday,
        },
      },
      orderBy:{
        createdAt: 'desc'
      },
    });
  }

  async getMonthlyIngresos(){
    let month = new Date().toISOString().slice(0, 7)
    let month_ = new Date(month);
    return await this.prisma.ingreso.findMany({
      where:{
        createdAt:{
          gte: month_,
        },
      },
      orderBy:{
        createdAt: 'desc'
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
