import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password); // generate the password hash
    try {// save the new user in the db 
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          userName: dto.userName,
          email: dto.email,
          rut: dto.rut,
          hash,
        },
      });
      const tok = await this.signToken(user.id, user.userName);
      return {tok, user};
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Estos datos ya están siendo utilizados',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          userName: dto.userName,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Usuario no está registrado',
      );
    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Contraseña incorrecta',
      );
    const tok = await this.signToken(user.id, user.userName);
    return {tok, user};
  }

  async signToken(
    userId: number,
    userName: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      userName,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '30d',
        secret: secret,
      },
    );

    return {
      access_token: token
    };
  }
}
