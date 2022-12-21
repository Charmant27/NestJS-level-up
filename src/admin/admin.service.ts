/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditAdmin } from './dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async editAdmin(adminId: number, dto: EditAdmin) {
    const admin = await this.prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        ...dto,
      },
    });
    delete admin.hash;
    console.log(admin);

    return admin;
  }

  async deleteAdmin(adminId: number) {
    const admin = await this.prisma.admin.delete({
      where: {
        id: adminId,
      },
    });

    return 'admin data was successfully deleted';
  }
}
