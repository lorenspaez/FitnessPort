import { Injectable , ForbiddenException } from '@nestjs/common';
import { doesNotThrow } from 'assert';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSheetDto, EditSheetDto} from './dto';

@Injectable()
export class SheetService {
  constructor(private prisma: PrismaService) {}

  async createSheet(dto: CreateSheetDto){
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

    return await this.prisma.sheet.create({
      data:{
        customerId: customer.id,
        customerName: customer.name,
        ...dto
      },
    });
  }

  async getSheetByRut(
    customerRut: string
  ){
    const sheet = await this.prisma.sheet.findFirst({
      where:{
        customerRut: customerRut,
      },
    });

    if (!sheet){
      throw new ForbiddenException(
        'No existe un cliente con ese RUT',
      );
    }

    return this.prisma.sheet.findFirst({
      where:{
        customerRut: customerRut
      }
    });
  }

  async getAllSheets() {
    return this.prisma.sheet.findMany({
      where: {
      },
    });
  }

  async editSheet(
    customerRut: string,
    dto: EditSheetDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: customerRut,
      },
    });

    return await this.prisma.sheet.update({
      where: {
        customerId: customer.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteSheetByRut(
    customerRut: string
  ) {

    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: customerRut,
      },
    });

    await this.prisma.sheet.delete({
      where: {
        customerId: customer.id,
      },
    });
    return "Cliente eliminado";
  }
}
