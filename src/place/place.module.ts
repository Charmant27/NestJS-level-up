/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TouristicPlaceController } from './place.controller';
import { TouristicPlaceService } from './place.service';

@Module({
  controllers: [TouristicPlaceController],
  providers: [TouristicPlaceService],
})
export class TouristicPlaceModule {}
