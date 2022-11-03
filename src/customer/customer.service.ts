import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, EditCustomerDto} from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(dto: CreateCustomerDto){
    return await this.prisma.customer.create({
      data:{
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
    });
  }

  async editCustomer(
    customerRut: string,
    dto: EditCustomerDto,
  ) {
    const customer = await this.prisma.customer.update({
      where: {
        rut: customerRut,
      },
      data: {
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
    customerRut: string
  ) {
    await this.prisma.customer.delete({
      where: {
        rut: customerRut,
      },
    });
    return "Cliente eliminado";
  }
}
