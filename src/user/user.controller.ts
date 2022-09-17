import { Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto} from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUserss() {
    return this.userService.getAllUsers();
  }
    
  @Patch('edit')
  editUser(
    @GetUser('id') userId: number, 
    @Body() dto: EditUserDto
    ) {
    return this.userService.editUser(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUserById(
    @GetUser('id') userId: number
    ) {
    return this.userService.deleteUserById(userId);
  }
}
