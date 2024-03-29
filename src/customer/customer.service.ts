import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, EditCustomerDto} from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(dto: CreateCustomerDto, userId: number, userName: string){
    return await this.prisma.customer.create({
      data:{
        adminId: userId,
        adminName: userName,
        ...dto
      },
    });
  }

  async getCustomerByRut(
    customerRut: string
  ){
    const customer = await this.prisma.customer.findFirst({
      where:{
        rut: customerRut,
      },
    });

    if (!customer){
      throw new ForbiddenException(
        'No existe un cliente con ese RUT',
      );
    }

    return this.prisma.customer.findFirst({
      where:{
        rut: customerRut
      }
    });
  }

  async getAllCustomers() {
    return this.prisma.customer.findMany({
      where: {
      },
      orderBy:{
        id: 'desc',
      },
    });
  }

  async getActiveCustomers() {
    return this.prisma.customer.findMany({
      where: {
        isActive: true,
      },
      orderBy:{
        id: 'asc',
      },
    });
  }

  async getInactiveCustomers() {
    return this.prisma.customer.findMany({
      where: {
        isActive: false,
      },
      orderBy:{
        id: 'asc',
      },
    });
  }

  async editCustomer(
    customerRut: string,
    dto: EditCustomerDto,
    userId: number,
    userName: string    
  ) {
    const customer = await this.prisma.customer.update({
      where: {
        rut: customerRut,
      },
      data: {
        adminId: userId,
        adminName: userName,
        ...dto,
      },
    });
  await this.prisma.ingreso.updateMany({
    where:{
      customerId: customer.id,
    },
    data:{
      customerName: customer.name,
    }
  })
    return customer;
  }

  async deleteCustomerByRut(
    userId: number,
    customerRut: string
  ) {
    if(userId != 2){
      throw new ForbiddenException(
        'Solo el Administrador puede borrar Registros',
      );
    }
    await this.prisma.customer.delete({
      where: {
        rut: customerRut,
      },
    });
    return "Cliente eliminado";
  }
}
