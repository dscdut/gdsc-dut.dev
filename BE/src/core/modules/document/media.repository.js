import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    async createOne(data) {
        return this.query()
            .insert(convertToSnakeCase(data))
            .returning('id');
    }
}

export const MediaRepository = new Repository('images');
