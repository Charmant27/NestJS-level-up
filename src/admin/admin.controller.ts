/* eslint-disable prettier/prettier */
import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('administrator')
export class AdminController {
  @UseGuards(AuthGuard('jwt'))
  @Get('admin')
  getAdmin() {
    return 'admin info';
  }
}
