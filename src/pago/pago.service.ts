import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagoService {
  constructor(private prisma: PrismaService) {}

  async createPago(dto: CreatePagoDto, userId: number, userName: string){
    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: dto.customerRut,
      },
    });

    if (!customer){
      throw new ForbiddenException(
        'No existe un cliente con ese RUT',
      );
    }
    
    return await this.prisma.pago.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
        adminId: userId,
        adminName: userName,
        ...dto
      },
    });
  }

  async getPagoByRut(
    customerRut: string
  ){
    const pago = await this.prisma.pago.findFirst({
      where:{
        customerRut: customerRut,
      },
    });

    if (!pago){
      throw new ForbiddenException(
        'No existe un cliente con ese RUT',
      );
    }

    return this.prisma.pago.findMany({
      where:{
        customerRut: customerRut
      },
      orderBy:{
        createdAt: 'desc'
      },
    });
  }

  async getAllPagos() {
    return this.prisma.pago.findMany({
      where: {
      },
      orderBy:{
        id: 'asc',
      },
    });
  }

  async editPago(
    pagoId: number,
    dto: UpdatePagoDto,
    userId: number, 
    userName: string
  ) {

    return await this.prisma.pago.update({
      where: {
        id: pagoId,
      },
      data: {
        ...dto,
        adminId: userId,
        adminName: userName,
      },
    });
  }

  async deletePagoByRut(
    pagoId: number
  ) {
    return this.prisma.pago.delete({
      where: {
        id: pagoId,
      },
    });
  }
}
