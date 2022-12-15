/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TouristicPlaceController } from './touristic-place.controller';
import { TouristicPlaceService } from './touristic-place.service';

@Module({
  controllers: [TouristicPlaceController],
  providers: [TouristicPlaceService],
})
export class TouristicPlaceModule {}
