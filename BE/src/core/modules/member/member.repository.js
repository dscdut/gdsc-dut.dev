import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    async findById(id) {
        return this.query()
            .select('members.*', 'members_gens.gen_id as gen_id', 'gens.name as gen_name', 'members_gens.department_id as department_id',
                'departments.name as department_name', 'members_gens.position_id as position_id', 'positions.name as position_name', 'images.url as image_url',
                'products.id as product_id', 'products.name as product_name')
            .from('members')
            .innerJoin(
                'members_gens',
                'members.id',
                'members_gens.member_id',
            )
            .innerJoin(
                'gens',
                'members_gens.gen_id',
                'gens.id',
            )
            .innerJoin(
                'positions',
                'members_gens.position_id',
                'positions.id',
            )
            .innerJoin(
                'departments',
                'members_gens.department_id',
                'departments.id',
            )
            .innerJoin(
                'images',
                'members.image_id',
                'images.id',
            )
            .leftJoin(
                'products',
                'members_gens.product_id',
                'products.id',
            )
            .where('members.id', id);
    }

    async createOne(member, gens) {
        let memberId;
        return this.query()
            .insert(convertToSnakeCase(member))
            .returning('id')
            .then(([result]) => {
                memberId = result.id;
                const memberGens = [];
                for (let i = 0; i < gens.length; i++) {
                    for (let j = 0; j < gens[i].products_id.length; j++) {
                        memberGens.push({
                            member_id: memberId,
                            gen_id: gens[i].gen_id,
                            department_id: gens[i].departments_id,
                            position_id: gens[i].positions_id,
                            product_id: gens[i].products_id[j]
                        });
                    }
                }
                return this.query().insert(memberGens).into('members_gens');
            })
            .then(() => this.query()
                .select('members.*', 'members_gens.gen_id as gen_id', 'gens.name as gen_name', 'members_gens.department_id as department_id',
                    'departments.name as department_name', 'members_gens.position_id as position_id', 'positions.name as position_name', 'images.url as image_url',
                    'products.id as product_id', 'products.name as product_name')
                .from('members')
                .innerJoin(
                    'members_gens',
                    'members.id',
                    'members_gens.member_id',
                )
                .innerJoin(
                    'gens',
                    'members_gens.gen_id',
                    'gens.id',
                )
                .innerJoin(
                    'positions',
                    'members_gens.position_id',
                    'positions.id',
                )
                .innerJoin(
                    'departments',
                    'members_gens.department_id',
                    'departments.id',
                )
                .innerJoin(
                    'images',
                    'members.image_id',
                    'images.id',
                )
                .innerJoin(
                    'products',
                    'members_gens.product_id',
                    'products.id',
                )
                .where('members.id', memberId));
    }

    deleteOne(id) {
        return this.query().where('member_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    async updateOne(id, member, membersGensIds) {
        return this.query().where('id', id).update(convertToSnakeCase(member))
            .then(() => this.query().insert(membersGensIds).into('members_gens'))
            .then(() => this.findById(id));
    }

    findMany(ids) {
        return this.query().select('*').from('members').whereIn('id', ids);
    }
}

export const MemberRepository = new Repository('members');
