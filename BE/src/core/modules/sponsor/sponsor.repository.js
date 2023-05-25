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

    async createOne(updateSponsor, genIds) {
        let sponsorId;

        return this.query()
            .insert(convertToSnakeCase(updateSponsor))
            .returning('id')
            .then(([result]) => {
                sponsorId = result.id;
                const genIdValues = genIds.map(genId => ({
                    sponsor_id: sponsorId,
                    gen_id: genId
                }));

                return this.query().insert(genIdValues).into('gens_sponsors');
            })
            .then(() => this.query()
                .select('sponsors.*', 'gens_sponsors.gen_id')
                .from('sponsors')
                .innerJoin('gens_sponsors', 'sponsors.id', 'gens_sponsors.sponsor_id')
                .where('sponsors.id', sponsorId))
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        acc[current.id].gen_ids.push(current.gen_id);
                    } else {
                        acc[current.id] = { ...current, gen_ids: [current.gen_id] };
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const { gen_id, ...rest } = obj;
                    return rest;
                });
                return finalResult;
            });
    }

    deleteOne(id) {
        return this.query().where('sponsor_id', id).del().from('gens_sponsors')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    async updateOne(id, data, genId) {
        return this.query().where('id', id).update(convertToSnakeCase(data))
            .then(() => this.query()
                .where('sponsor_id', id)
                .update({ gen_id: genId })
                .into('gens_sponsors'));
    }
}

export const SponsorRepository = new Repository('sponsors');
