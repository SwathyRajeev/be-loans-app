import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { defaultValues } from 'src/common/master-module-data/default-values.data';
import { GeneralValue } from './entities/general-value.entity';

@Injectable()
export class GeneralValueService extends TypeOrmCrudService<GeneralValue> {
  constructor(@InjectRepository(GeneralValue) repo) {
    super(repo);
  }

  async onModuleInit() {
    let data = await this.repo.find();
    if (data.length! = defaultValues.length) {
      this.repo.save(defaultValues);
    }
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);
    return this.repo.softRemove(myEntity);
  }
}
