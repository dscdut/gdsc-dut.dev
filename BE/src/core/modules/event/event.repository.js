import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    async findById(id) {
        return this.query().where('events.id', id).select([
            'events.id',
            'events.name',
            'images.url as image_url',
            'events.description',
            'events.deleted_at',
            'events.created_at',
            'events.updated_at',
            'sponsors.id as sponsor_id',
            'sponsors.name as sponsor_name',
            'gens.id as gen_id',
            'gens.name as gen_name',
        ])
            .innerJoin('images', 'events.image_id', 'images.id')
            .innerJoin('gens_sponsors', 'events.id', 'gens_sponsors.event_id')
            .innerJoin('sponsors', 'gens_sponsors.sponsor_id', 'sponsors.id')
            .innerJoin('gens', 'gens_sponsors.gen_id', 'gens.id')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].sponsors)) {
                            acc[current.id].sponsors.push({
                                id: current.sponsor_id,
                                name: current.sponsor_name,
                            });
                        } else {
                            acc[current.id].sponsors = [
                                { id: current.sponsor_id, name: current.sponsor_name },
                            ];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            gens: [{ id: current.gen_id, name: current.gen_name }],
                            sponsors: [{ id: current.sponsor_id, name: current.sponsor_name }],
                            image: { id: current.image_id, url: current.image_url },
                        };

                        delete acc[current.id].image_id;
                        delete acc[current.id].image_url;
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const {
                        sponsor_id, sponsor_name, gen_id, gen_name, ...rest
                    } = obj;
                    return rest;
                });
                return finalResult[0];
            });
    }

    async findAll() {
        return this.query().select([
            'events.id',
            'events.name',
            'images.url as image_url',
            'events.description',
            'events.deleted_at',
            'events.created_at',
            'events.updated_at',
            'sponsors.id as sponsor_id',
            'sponsors.name as sponsor_name',
            'gens.id as gen_id',
            'gens.name as gen_name',
        ])
            .innerJoin('images', 'events.image_id', 'images.id')
            .innerJoin('gens_sponsors', 'events.id', 'gens_sponsors.event_id')
            .innerJoin('sponsors', 'gens_sponsors.sponsor_id', 'sponsors.id')
            .innerJoin('gens', 'gens_sponsors.gen_id', 'gens.id')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].sponsors)) {
                            acc[current.id].sponsors.push({
                                id: current.sponsor_id,
                                name: current.sponsor_name,
                            });
                        } else {
                            acc[current.id].sponsors = [
                                { id: current.sponsor_id, name: current.sponsor_name },
                            ];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            gens: [{ id: current.gen_id, name: current.gen_name }],
                            sponsors: [{ id: current.sponsor_id, name: current.sponsor_name }],
                            image: { id: current.image_id, url: current.image_url },
                        };

                        delete acc[current.id].image_id;
                        delete acc[current.id].image_url;
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const {
                        sponsor_id, sponsor_name, gen_id, gen_name, ...rest
                    } = obj;
                    return rest;
                });
                return finalResult;
            });
    }

    async createOne(event, sponsorIds, genId) {
        let eventId;
        return this.query()
            .insert(convertToSnakeCase(event))
            .returning('id')
            .then(([result]) => {
                eventId = result.id;
                const eventIdValue = {
                    event_id: eventId,
                };
                return this.query().whereIn('sponsor_id', sponsorIds).and.where('gen_id', genId).update(eventIdValue).from('gens_sponsors');
            })
            .then(() => this.findById(eventId));
    }

    async deleteOne(id) {
        return this.query().where('id', id).del();
    }

    async updateOne(id, data) {
        return this.query().where('id', id).update(convertToSnakeCase(data)).returning('*');
    }
}

export const EventRepository = new Repository('events');
