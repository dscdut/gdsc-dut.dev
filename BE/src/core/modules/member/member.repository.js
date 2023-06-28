import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .select('members.*', 'members_gens.gen_id as gen_id', 'gens.name as gen_name', 'members_gens.department_id as department_id',
                'departments.name as department_name', 'members_gens.position_id as position_id', 'positions.name as position_name', 'images.url as image_url')
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
            .where('members.id', id);
    }

    async createOne(member, genIds, departmentIds, positionIds) {
        let memberId;
        return this.query()
            .insert(convertToSnakeCase(member))
            .returning('id')
            .then(([result]) => {
                memberId = result.id;
                const memberGens = [];
                for (let i = 0; i < genIds.length; i++) {
                    memberGens.push({
                        member_id: memberId, gen_id: genIds[i], department_id: departmentIds[i], position_id: positionIds[i]
                    });
                }
                return this.query().insert(memberGens).into('members_gens');
            })
            .then(() => this.query()
                .select('members.*', 'members_gens.gen_id as gen_id', 'gens.name as gen_name', 'members_gens.department_id as department_id',
                    'departments.name as department_name', 'members_gens.position_id as position_id', 'positions.name as position_name', 'images.url as image_url')
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
                .where('members.id', memberId));
    }

    deleteOne(id) {
        return this.query().where('member_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(convertToSnakeCase(data));
    }

    findMany(ids) {
        return this.query().select('*').from('members').whereIn('id', ids);
    }
}

export const MemberRepository = new Repository('members');
