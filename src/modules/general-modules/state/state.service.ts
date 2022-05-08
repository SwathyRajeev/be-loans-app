import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StateService extends TypeOrmCrudService<State> {
  constructor(@InjectRepository(State) repo: Repository<State>) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);

    try {
      return await this.repo.remove(myEntity);
    } catch (error) {
      if (error.code === '23503') {
        throw new ForbiddenException(`Can not Delete this state, State is being used.`);
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }

  async getStates() {
    return await this.repo.query(`SELECT s.id AS "value", s.name AS "label",
          (select json_agg(dis) from ( 
                SELECT d.id AS "value", d.name AS "label",
                  (select json_agg(cen) from (SELECT c.id AS "value", c.name AS "label" FROM center c WHERE c."districtId" = d.id ) cen) as center 			
                        FROM districts d WHERE d."stateId" = s.id ) dis) as district
        FROM states s`);
  }
}
