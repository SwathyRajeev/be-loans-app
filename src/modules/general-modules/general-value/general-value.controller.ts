import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateGeneralValueDto } from './dto/create-general-value.dto';
import { UpdateGeneralValueDto } from './dto/update-general-value.dto';
import { GeneralValue } from './entities/general-value.entity';
import { GeneralValueService } from './general-value.service';

@ApiTags('General Value - APP & ADMIN PANEL (All constant/default values used in Admin Panel, Back end, and APP)')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Crud({
  model: {
    type: GeneralValue,
  },
  dto: {
    create: CreateGeneralValueDto,
    update: UpdateGeneralValueDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('general-value')
export class GeneralValueController implements CrudController<GeneralValue> {
  constructor(public service: GeneralValueService) { }
}
