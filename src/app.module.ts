import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TouristicPlaceModule } from './touristic-place/touristic-place.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, AuthModule, TouristicPlaceModule, UserModule],
})
export class AppModule {}
