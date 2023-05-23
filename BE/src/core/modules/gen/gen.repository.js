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
        return this.query().where('gen_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('gen_id', id)
                .del()
                .from('gens_sponsors'))
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }

    findMany(ids) {
        return this.query().select('*').from('gens').whereIn('id', ids);
    }
}

export const GenRepository = new Repository('gens');
