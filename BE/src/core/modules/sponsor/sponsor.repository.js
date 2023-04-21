import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query().where('sponsors.id', id).select([
            'sponsors.id',
            'sponsors.name',
            'images.url as image_url',
            'sponsors.description',
            'sponsors.infor_url',
            'sponsors.deleted_at',
            'sponsors.created_at',
            'sponsors.updated_at',
        ])
            .innerJoin('images', 'sponsors.image_id', 'images.id')
            .first();
    }

    findAll() {
        return this.query().select([
            'sponsors.id',
            'sponsors.name',
            'images.url as image_url',
            'sponsors.description',
            'sponsors.infor_url',
            'sponsors.deleted_at',
            'sponsors.created_at',
            'sponsors.updated_at',
        ])
            .innerJoin('images', 'sponsors.image_id', 'images.id');
    }

    async createOne(sponsor, genId) {
        let sponsorId;

        return this.query()
            .insert(convertToSnakeCase(sponsor))
            .returning('id')
            .then(([result]) => {
                sponsorId = result.id;
                return this.query()
                    .insert({ sponsor_id: sponsorId, gen_id: genId })
                    .into('gens_sponsors');
            })
            .then(() => this.query()
                .select('sponsors.*', 'gens_sponsors.gen_id as gen_id')
                .from('sponsors')
                .innerJoin('gens_sponsors', 'sponsors.id', 'gens_sponsors.sponsor_id')
                .where('sponsors.id', sponsorId));
    }

    deleteOne(id) {
        return this.query().where('id', id).del();
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }
}

export const SponsorRepository = new Repository('sponsors');
