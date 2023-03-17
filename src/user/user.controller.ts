import { Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto} from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':rut')
  getUserByRut(
    @Param('rut') rut: string
  ){
    return this.userService.getUserByRut(rut);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
    
  @Patch('edit/:rut')
  editUser(
    @Param('rut') rut: string,
    @Body() dto: EditUserDto
    ) {
    return this.userService.editUser(rut, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUserById(
    @GetUser('id') userId: number
    ) {
    return this.userService.deleteUserById(userId);
  }
}
