import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto} from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByRut(
    userRut: string
  ){
    return this.prisma.user.findFirst({
      where:{
        rut: userRut
      }
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
      },
    });
  }

  async editUser(
    userRut: string,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        rut: userRut,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  async deleteUserById(
    userId: number
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (user.id !== userId)
      throw new ForbiddenException(
        'Acceso denegado al usuario',
      );

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return "Usuario eliminado";
  }
}
