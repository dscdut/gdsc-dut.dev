import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query().where('products.id', id).select([
            'products.id',
            'products.name',
            'images.url as image_url',
            'products.description',
            'products.infor_url',
            'products.deleted_at',
            'products.created_at',
            'products.updated_at',
        ])
            .innerJoin('images', 'products.image_id', 'images.id')
            .first();
    }

    findAll() {
        return this.query().select([
            'products.id',
            'products.name',
            'images.url as image_url',
            'products.description',
            'products.infor_url',
            'products.deleted_at',
            'products.created_at',
            'products.updated_at',
        ])
            .innerJoin('images', 'products.image_id', 'images.id')
            .orderBy('products.id', 'asc');
    }

    createOne(product, memberId) {
        let productId;

        return this.query()
            .insert(convertToSnakeCase(product))
            .returning('id')
            .then(([result]) => {
                productId = result.id;
                const updateMemberGens = memberId.map(id => this.query().update({ product_id: productId }).where('member_id', id).into('members_gens'));
                return Promise.all(updateMemberGens);
            })
            .then(() => this.query()
                .select('products.*', 'members_gens.member_id as member_id')
                .from('products')
                .innerJoin('members_gens', 'products.id', 'members_gens.product_id')
                .where('products.id', productId));
    }

    deleteOne(id) {
        return this.query().where('product_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }
}

export const ProductRepository = new Repository('products');
