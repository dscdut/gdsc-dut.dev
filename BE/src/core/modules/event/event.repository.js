import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query().where('events.id', id).select([
            'events.id',
            'events.name',
            'images.url as image_url',
            'events.description',
            'events.deleted_at',
            'events.created_at',
            'events.updated_at',
        ])
            .innerJoin('images', 'events.image_id', 'images.id')
            .first();
    }

    findAll() {
        return this.query()
            .select([
                'events.id',
                'events.name',
                'images.url as image_url',
                'events.description',
                'events.deleted_at',
                'events.created_at',
                'events.updated_at',
            ])
            .innerJoin('images', 'events.image_id', 'images.id')
            .orderBy('events.id', 'asc');
    }

    createOne(data) {
        return this.query().insert(convertToSnakeCase(data)).returning('*');
    }

    deleteOne(id) {
        return this.query().where('id', id).del();
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(convertToSnakeCase(data)).returning('*');
    }
}

export const EventRepository = new Repository('events');
