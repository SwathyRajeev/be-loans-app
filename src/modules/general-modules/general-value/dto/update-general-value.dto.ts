import { PartialType } from '@nestjs/swagger';
import { CreateGeneralValueDto } from './create-general-value.dto';

export class UpdateGeneralValueDto extends PartialType(CreateGeneralValueDto) {}
