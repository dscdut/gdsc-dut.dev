import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    async findById(id) {
        return this.query()
            .where('sponsors.id', id)
            .select([
                'sponsors.id',
                'sponsors.name as name',
                'images.id as image_id',
                'images.url as image_url',
                'sponsors.description',
                'sponsors.infor_url',
                'sponsors.deleted_at',
                'sponsors.created_at',
                'sponsors.updated_at',
                'gens.name as gen_name',
                'gens_sponsors.gen_id',
            ])
            .innerJoin('images', 'sponsors.image_id', 'images.id')
            .innerJoin('gens_sponsors', 'sponsors.id', 'gens_sponsors.sponsor_id')
            .innerJoin('gens', 'gens_sponsors.gen_id', 'gens.id')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].gens)) {
                            acc[current.id].gens.push({
                                id: current.gen_id,
                                name: current.gen_name,
                            });
                        } else {
                            acc[current.id].gens = [
                                { id: current.gen_id, name: current.gen_name },
                            ];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            gens: [{ id: current.gen_id, name: current.gen_name }],
                            image: { id: current.image_id, url: current.image_url },
                        };

                        delete acc[current.id].image_id;
                        delete acc[current.id].image_url;
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const { gen_id, gen_name, ...rest } = obj;
                    return rest;
                });
                return finalResult[0];
            });
    }

    async findAll() {
        return this.query()
            .select([
                'sponsors.id',
                'sponsors.name',
                'images.url as image_url',
                'sponsors.description',
                'sponsors.infor_url',
                'gens_sponsors.gen_id',
                'gens.name as gen_name',
                'sponsors.deleted_at',
                'sponsors.created_at',
                'sponsors.updated_at',
            ])
            .innerJoin('images', 'sponsors.image_id', 'images.id')
            .innerJoin('gens_sponsors', 'sponsors.id', 'gens_sponsors.sponsor_id')
            .innerJoin('gens', 'gens_sponsors.gen_id', 'gens.id')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].gens)) {
                            acc[current.id].gens.push({
                                id: current.gen_id,
                                name: current.gen_name,
                            });
                        } else {
                            acc[current.id].gens = [
                                { id: current.gen_id, name: current.gen_name },
                            ];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            gens: [{ id: current.gen_id, name: current.gen_name }],
                        };
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const { gen_id, gen_name, ...rest } = obj;
                    return rest;
                });
                return finalResult;
            });
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
                    gen_id: genId,
                }));

                return this.query().insert(genIdValues).into('gens_sponsors');
            })
            .then(() => this.findById(sponsorId));
    }

    async deleteOne(id) {
        return this.query()
            .where('sponsor_id', id)
            .del()
            .from('gens_sponsors')
            .then(() => this.query().where('id', id).del());
    }

    async updateOne(id, data) {
        return this.query()
            .where('id', id)
            .update(convertToSnakeCase(data))
            .then(() => this.findById(id));
    }

    async upsertOne(id, genIds) {
        const genIdValues = genIds.map(genId => ({
            sponsor_id: id,
            gen_id: genId,
        }));

        return this.query()
            .insert(genIdValues)
            .into('gens_sponsors')
            .then(() => this.findById(id));
    }

    async findMany(ids) {
        return this.query().select('*').from('sponsors').whereIn('id', ids);
    }
}

export const SponsorRepository = new Repository('sponsors');
