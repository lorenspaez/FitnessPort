import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagoService {
  constructor(private prisma: PrismaService) {}

  async createPago(dto: CreatePagoDto){
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

    const pago = await this.prisma.pago.findFirst({
      where:{
        customerId: customer.id,
      },
    });

    if (pago != null){
      throw new ForbiddenException(
        'Este usuario ya tiene una Ficha',
      );
    }
    
    return await this.prisma.pago.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
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
    });
  }

  async editPago(
    customerRut: string,
    dto: UpdatePagoDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: customerRut,
      },
    });

    return await this.prisma.pago.update({
      where: {
        customerId: customer.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletePagoByRut(
    customerRut: string
  ) {

    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: customerRut,
      },
    });

    await this.prisma.pago.delete({
      where: {
        customerId: customer.id,
      },
    });
    return "Cliente eliminado";
  }
}