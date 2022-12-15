/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      //generate the password
      const hash = await argon.hash(dto.password);

      //generate the admin
      const admin = await this.prisma.admin.create({
        data: {
          adminID: dto.adminID,
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
        },
      });

      delete admin.hash;
      return admin;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'These credentials already belong to another User!!!',
          );
        }
      }
    }
  }

  async login(dto: LoginDto) {
    //find user
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if admin doesn't exist
    if (!admin) {
      throw new ForbiddenException('Incorrect credentials!!!');
    }

    //credentials comparison
    const pwdMatch = await argon.verify(admin.hash, dto.password);
    if (!pwdMatch) {
      throw new ForbiddenException('Incorrect credentials!!!');
    }
    delete admin.hash;
    return admin;
  }
}
