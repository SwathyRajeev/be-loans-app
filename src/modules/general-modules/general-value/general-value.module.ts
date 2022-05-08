import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GeneralValue } from './entities/general-value.entity';
import { GeneralValueController } from './general-value.controller';
import { GeneralValueService } from './general-value.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralValue]), AuthModule,],
  controllers: [GeneralValueController],
  providers: [GeneralValueService],
})
export class GeneralValueModule { }
