/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { TouristicPlaceService } from './place.service';
import { CreatePlaceDto, EditPlaceDto } from './dto';
@UseGuards(JwtGuard)
@Controller('touristic-places')
export class TouristicPlaceController {
  constructor(private touristicPlaceService: TouristicPlaceService) {}

  @Get()
  getTouristicPlaces(@GetUser('id') adminId: number) {
    return this.touristicPlaceService.getTouristicPlaces(adminId);
  }

  @Get(':id')
  getSingleTouristicPlace(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) placeId: number,
  ) {
    return this.touristicPlaceService.getSingleTouristicPlace(id, placeId);
  }

  @Post('api/place')
  createTouristicPlace(
    @GetUser('id') adminId: number,
    @Body() dto: CreatePlaceDto,
  ) {
    return this.touristicPlaceService.createTouristicPlace(adminId, dto);
  }

  @Patch('api/place/:id')
  updateTouristicPlace(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) placeId: number,
    @Body() dto: EditPlaceDto,
  ) {
    return this.touristicPlaceService.updateTouristicPlace(
      adminId,
      placeId,
      dto,
    );
  }

  @Delete(':id')
  deleteTouristicPlace(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) placeId: number,
  ) {
    return this.touristicPlaceService.deleteTouristicPlace(adminId, placeId);
  }
}
