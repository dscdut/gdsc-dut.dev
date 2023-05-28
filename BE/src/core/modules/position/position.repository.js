import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findById(id) {
        return this.query().where('id', id).select().first();
    }

    findAll() {
        return this.query().select();
    }

    createOne(data) {
        return this.query().insert(data);
    }

    deleteOne(id) {
        return this.query().where('position_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }
}

export const PositionRepository = new Repository('positions');
