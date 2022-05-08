import { PickType } from '@nestjs/swagger';
import { CreateAppVersionDto } from './create-app-version.dto';

export class UpdateAppVersionDto extends PickType(CreateAppVersionDto, ['label']) {}
