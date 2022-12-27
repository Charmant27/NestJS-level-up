/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePlaceDto, EditPlaceDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TouristicPlaceService {
  constructor(private prisma: PrismaService) {}

  async createTouristicPlace(adminId: number, dto: CreatePlaceDto) {
    const touristicPlace = await this.prisma.place.create({
      data: {
        admin: {
          connect: { id: adminId },
        },
        ...dto,
      },
    });

    return touristicPlace;
  }

  async getTouristicPlaces(adminId: number) {
    return this.prisma.place.findMany({
      where: {
        adminId,
      },
    });
  }

  async getSingleTouristicPlace(adminId: number, placeId: number) {
    const place = await this.prisma.place.findFirst({
      where: {
        id: placeId,
        adminId,
      },
    });
    if (!place) {
      throw new NotFoundException('Could not find place');
    }
    return place;
  }

  async updateTouristicPlace(
    adminId: number,
    placeId: number,
    dto: EditPlaceDto,
  ) {
    const place = await this.prisma.place.findUnique({
      where: {
        id: placeId,
      },
    });
    if (!place || place.adminId !== adminId) {
      throw new ForbiddenException('Cannot access the data');
    }
    return this.prisma.place.update({
      where: {
        id: placeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTouristicPlace(adminId: number, placeId: number) {
    const place = await this.prisma.place.findUnique({
      where: {
        id: placeId,
      },
    });
    if (!place || place.adminId === adminId) {
      throw new ForbiddenException('Invalid data');
    }
    return this.prisma.place.delete({
      where: {
        id: placeId,
      },
    });
  }
}
