import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppVersionService } from './app-version.service';
import { CreateAppVersionDto } from './dto/create-app-version.dto';
import { UpdateAppVersionDto } from './dto/update-app-version.dto';

@ApiTags('App Version')
@Controller('app-version')
export class AppVersionController {
  constructor(private readonly versionService: AppVersionService) { }

  @ApiOperation({ summary: 'Create a single App Version' })
  @Post()
  create(@Body() createAppVersionDto: CreateAppVersionDto) {
    return this.versionService.create(createAppVersionDto);
  }

  @ApiOperation({ summary: 'Retrieve App Version' })
  @Get()
  findAll() {
    return this.versionService.findAll();
  }

  @ApiOperation({ summary: 'Edit a single App Version' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAppVersionDto: UpdateAppVersionDto) {
    return this.versionService.update(+id, updateAppVersionDto);
  }

  @ApiOperation({ summary: 'Edit a single App Version' })
  @Put('check/:version')
  checkVersion(@Param('version') version: string) {
    return this.versionService.checkVersion(version);
  }

  @ApiOperation({ summary: 'Delete a single App Version' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionService.remove(+id);
  }
}
