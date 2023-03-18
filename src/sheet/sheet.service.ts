import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSheetDto, EditSheetDto} from './dto';

@Injectable()
export class SheetService {
  constructor(private prisma: PrismaService) {}

  async createSheet(dto: CreateSheetDto, userId: number, userName: string){
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
        adminId: userId,
        adminName: userName,
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

    return this.prisma.sheet.findMany({
      where:{
        customerRut: customerRut
      },
      orderBy:{
        createdAt: 'desc'
      },
    });
  }

  async getAllSheets() {
    return this.prisma.sheet.findMany({
      where: {
      },
      orderBy:{
        id: 'desc',
      },
    });
  }

  async editSheet(
    sheetId: number,
    dto: EditSheetDto,
    userId: number, userName: string
  ) {
    return await this.prisma.sheet.update({
      where: {
        id: sheetId,
      },
      data: {
        ...dto,
        adminId: userId,
        adminName: userName,
      },
    });
  }

  async deleteSheetById(
    sheetId: number
  ) {

    await this.prisma.sheet.delete({
      where: {
        id: sheetId,
      },
    });
    return "Ficha eliminado";
  }
}
