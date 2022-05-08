import { ConflictException, ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbStatus } from 'src/common/enums/db-status.enum';
import { Repository } from 'typeorm';
import { CreateAppVersionDto } from './dto/create-app-version.dto';
import { UpdateAppVersionDto } from './dto/update-app-version.dto';
import { AppVersion } from './entities/app-version.entity';

@Injectable()
export class AppVersionService {
  constructor(@InjectRepository(AppVersion) private versionRepo: Repository<AppVersion>) { }

  async create(createAppVersionDto: CreateAppVersionDto) {
    const { label } = createAppVersionDto;

    let newAppVersion = new AppVersion();

    newAppVersion.label = label;

    try {
      newAppVersion = this.versionRepo.create(newAppVersion);
      await this.versionRepo.update({ status: true }, { status: false });
      const result = await this.versionRepo.save(newAppVersion);

      return {
        statusCode: HttpStatus.OK,
        message: 'Version added successfully',
        status: 'Success',
        data: result,
      };
    } catch (error) {
      if (error.code === DbStatus.DUPLICATE) {
        throw new ConflictException('Version Already Exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async findAll() {
    return await this.versionRepo.find();
  }

  async update(id: number, updateAppVersionDto: UpdateAppVersionDto) {
    const result = await this.versionRepo.update({ id }, updateAppVersionDto);

    if (result.affected > 0) {
      return {
        message: 'Version updated successfully',
        status: HttpStatus.OK,
      };
    }
  }
  async checkVersion(version: string) {
    try {
      const result = await this.versionRepo.findOne({ label: version });
      if (result) {
        return result.status;
      }
      else {
        return false;
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    let result = await this.versionRepo.delete({ id });
    if (result.affected > 0) {
      return {
        message: 'Version deleted successfully',
        status: HttpStatus.OK,
      };
    }
  }
}
