/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createTourist(dto: CreateUserDto) {
    try {
      const tourist = await this.prisma.tourist.create({
        data: {
          ...dto,
        },
      });
      return tourist;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'these credentials belong to another user',
          );
        }
      }
    }
  }

  async getAllTourists() {
    return this.prisma.tourist.findMany();
  }

  async getSingleTourist(touristId: number) {
    const tourist = await this.prisma.tourist.findFirst({
      where: {
        id: touristId,
      },
    });
    if (!tourist) {
      throw new NotFoundException('could not find tourist');
    }
    return tourist;
  }

  async deleteTourist(touristId: number) {
    const tourist = await this.prisma.tourist.findUnique({
      where: {
        id: touristId,
      },
    });
    if (!tourist) {
      throw new NotFoundException('could not find tourist');
    }
    return this.prisma.tourist.delete({
      where: {
        id: touristId,
      },
    });
  }
}
