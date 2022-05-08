import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictService extends TypeOrmCrudService<District> {
  constructor(@InjectRepository(District) repo: Repository<District>) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);

    try {
      return await this.repo.remove(myEntity);
    } catch (error) {
      if (error.code === '23503') {
        throw new ForbiddenException(`Can not Delete this District, District is being used.`);
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }
}
