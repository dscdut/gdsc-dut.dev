import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    async findById(id) {
        return this.query().where('products.id', id).select([
            'products.id',
            'products.name',
            'images.url as image_url',
            'images.id as image_id',
            'products.description',
            'products.infor_url',
            'products.deleted_at',
            'products.created_at',
            'products.updated_at',
            'gens.name as gen_name',
            'members_gens.gen_id',
            'members_gens.member_id',
            'members.full_name',
        ])
            .innerJoin('images', 'products.image_id', 'images.id')
            .innerJoin('members_gens', 'products.id', 'members_gens.product_id')
            .innerJoin('members', 'members_gens.member_id', 'members.id')
            .innerJoin('gens', 'members_gens.gen_id', 'gens.id')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].members)) {
                            acc[current.id].members.push({ id: current.member_id, name: current.full_name });
                        } else {
                            acc[current.id].members = [{ id: current.member_id, name: current.full_name }];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            image: { id: current.image_id, url: current.image_url },
                            gens: { id: current.gen_id, name: current.gen_name },
                            members: [{ id: current.member_id, name: current.full_name }]
                        };
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const {
                        gen_id, gen_name, full_name, member_id, image_url, image_id, ...rest
                    } = obj;
                    return rest;
                });
                return finalResult[0];
            });
    }

    async findAll() {
        return this.query().select([
            'products.id',
            'products.name',
            'images.url as image_url',
            'images.id as image_id',
            'products.description',
            'products.infor_url',
            'products.deleted_at',
            'products.created_at',
            'products.updated_at',
            'gens.name as gen_name',
            'members_gens.gen_id',
            'members_gens.member_id',
            'members.full_name'
        ])
            .innerJoin('images', 'products.image_id', 'images.id')
            .innerJoin('members_gens', 'products.id', 'members_gens.product_id')
            .innerJoin('members', 'members_gens.member_id', 'members.id')
            .innerJoin('gens', 'members_gens.gen_id', 'gens.id')
            .orderBy('products.id', 'asc')
            .then(results => {
                const groupByResults = results.reduce((acc, current) => {
                    if (acc[current.id]) {
                        if (Array.isArray(acc[current.id].members)) {
                            acc[current.id].members.push({ id: current.member_id, name: current.full_name });
                        } else {
                            acc[current.id].members = [{ id: current.member_id, name: current.full_name }];
                        }
                    } else {
                        acc[current.id] = {
                            ...current,
                            image: { id: current.image_id, url: current.image_url },
                            gens: { id: current.gen_id, name: current.gen_name },
                            members: [{ id: current.member_id, name: current.full_name }]
                        };
                    }
                    return acc;
                }, {});

                const finalResult = Object.values(groupByResults).map(obj => {
                    const {
                        gen_id, gen_name, full_name, member_id, image_url, image_id, ...rest
                    } = obj;
                    return rest;
                });
                return finalResult;
            });
    }

    async createOne(product) {
        return this.query()
            .insert(convertToSnakeCase(product))
            .returning('id');
    }

    async deleteOne(id) {
        return this.query().where('product_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    async updateOne(id, data) {
        return this.query().where('id', id).update(convertToSnakeCase(data))
            .then(() => this.findById(id));
    }
}

export const ProductRepository = new Repository('products');
