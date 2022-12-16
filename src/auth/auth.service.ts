/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
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

      return this.adminToken(
        admin.id,
        admin.adminID,
        admin.email,
        admin.firstName,
        admin.lastName,
      );
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
    return this.adminToken(
      admin.id,
      admin.adminID,
      admin.email,
      admin.firstName,
      admin.lastName,
    );
  }

  async adminToken(
    id: number,
    adminID: string,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<{ access_token: string; payload: object }> {
    const payload = {
      sub: id,
      adminID: adminID,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '45m',
      secret: secret,
    });

    return {
      payload: payload,
      access_token: token,
    };
  }
}
