import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@ApiTags('Districts - APP & Admin Panel')
@ApiBearerAuth('JWT')
@Crud({
  model: {
    type: District,
  },
  dto: {
    create: CreateDistrictDto,
    update: UpdateDistrictDto,
  },
  routes: {
    only: ['createOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    getManyBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    updateOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
  },
  query: {
    exclude: ['created_date', 'updated_date', 'deleted_At'],
    join: {
      state_id: {
        exclude: ['created_date', 'updated_date', 'deleted_At'],
        eager: true,
      },
    },
  },
})
@Controller('district')
export class DistrictController implements CrudController<District> {
  constructor(public service: DistrictService) { }
}
