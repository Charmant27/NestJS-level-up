/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { CreateUserDto } from './dto';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ParseIntPipe } from '@nestjs/common/pipes';

@UseGuards(JwtGuard)
@Controller('tourists')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('api/tourist')
  createTourist(@Body() dto: CreateUserDto) {
    return this.userService.createTourist(dto);
  }

  @Get()
  getAllTourists() {
    return this.userService.getAllTourists();
  }

  @Get('api/tourist/:id')
  getSingleTourist(@Param('id', ParseIntPipe) touristId: number) {
    return this.userService.getSingleTourist(touristId);
  }

  @Delete(':id')
  deleteTourist(@Param('id', ParseIntPipe) touristId: number) {
    return this.userService.deleteTourist(touristId);
  }
}
