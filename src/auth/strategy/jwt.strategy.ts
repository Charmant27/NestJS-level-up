/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    adminID: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    const admin = await this.prisma.admin.findMany({
      where: {
        id: payload.sub,
        adminID: payload.adminID,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
      select: {
        id: true,
        adminID: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    return admin;
  }
}
