import { Post, Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateCustomerDto, EditCustomerDto} from './dto';
import { CustomerService } from './customer.service';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  createCustomer(
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customerService.createCustomer(dto, userId, userName);
  }

  @Get(':rut')
  getCustomerByRut(
    @Param('rut') rut: string
  ){
    return this.customerService.getCustomerByRut(rut);
  }

  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Get('status/actives')
  getActiveCustomers() {
    return this.customerService.getActiveCustomers();
  }

  @Get('status/inactives')
  getInactiveCustomers() {
    return this.customerService.getInactiveCustomers();
  }
    
  @Patch('edit/:rut')
  editCustomer(
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    @Param('rut') rut: string,
    @Body() dto: EditCustomerDto
    ) {
    return this.customerService.editCustomer(rut, dto, userId, userName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':rut')
  deleteCustomerByRut(
    @Param('rut') rut: string
    ) {
    return this.customerService.deleteCustomerByRut(rut);
  }
}
