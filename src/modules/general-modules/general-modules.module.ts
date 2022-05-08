import { Module } from '@nestjs/common';
import { AppVersionModule } from './app-version/app-version.module';
import { DistrictModule } from './district/district.module';

import { GeneralValueModule } from './general-value/general-value.module';
import { S3UploadModule } from './s3-upload/s3-upload.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [

    StateModule,
    DistrictModule,

    GeneralValueModule,
    S3UploadModule,

    AppVersionModule,

  ],
})
export class GeneralModulesModule { }
