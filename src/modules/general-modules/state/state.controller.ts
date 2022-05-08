import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { State } from './entities/state.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('States - APP & Admin Panel')
@ApiBearerAuth('JWT')
@Crud({
  model: {
    type: State,
  },
  dto: {
    create: CreateStateDto,
    update: UpdateStateDto,
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
  },
})
@Controller('state')
export class StateController implements CrudController<State> {
  constructor(public service: StateService) { }




  @ApiOperation({ summary: 'Get States with district & Centers - for APP use' })
  @Get('all')
  async getStates() {
    return await this.service.getStates();
  }

}
