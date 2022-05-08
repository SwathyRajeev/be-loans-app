import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([District]), AuthModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
