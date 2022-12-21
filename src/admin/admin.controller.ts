/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { Admin } from '@prisma/client';
import { EditAdmin } from './dto';
import { AdminService } from './admin.service';

@UseGuards(JwtGuard)
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('admin')
  getAdmin(@GetUser() admin: Admin) {
    return admin;
  }

  @Patch('api/admin')
  editAdmin(@GetUser('id') adminId: number, @Body() dto: EditAdmin) {
    return this.adminService.editAdmin(adminId, dto);
  }

  @Delete()
  deleteAdmin(@GetUser('id') adminId: number) {
    return this.adminService.deleteAdmin(adminId);
  }
}
