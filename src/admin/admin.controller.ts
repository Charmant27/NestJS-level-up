/* eslint-disable prettier/prettier */
import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { Admin } from '@prisma/client';

 @UseGuards(JwtGuard)
 @Controller('admins')
 export class AdminController {
   @Get('admin')
   getAdmin(@GetUser() admin: Admin) {
     return admin;
   }
 }
