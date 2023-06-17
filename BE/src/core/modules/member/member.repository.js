import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .where('members.id', id)
            .select([
                'members.id',
                'images.id as image_id',
                'images.url as image_url',
                'members.full_name',
                'members.email',
                'members.phone',
                'members.birthday',
                'members.horoscope_sign',
                'members.philosophy',
                'members.feelings',
                'members.infor_url',
                'gens.id as gen_id',
                'gens.name as gen_name',
                'positions.id as position_id',
                'positions.name as position_name',
                'departments.id as department_id',
                'departments.name as department_name',
                'members.deleted_at',
                'members.created_at',
                'members.updated_at',
            ])
            .innerJoin('images', 'members.image_id', 'images.id')
            .innerJoin('members_gens', 'members.id', 'members_gens.member_id')
            .innerJoin('gens', 'members_gens.gen_id', 'gens.id')
            .innerJoin('positions', 'members_gens.position_id', 'positions.id')
            .innerJoin('departments', 'members_gens.department_id', 'departments.id')
            .first()
            .then(result => {
                const {
                    image_id, image_url, gen_id, gen_name, position_id, position_name, department_id, department_name, ...rest
                } = result;
                return {
                    ...rest,
                    image: { id: image_id, url: image_url },
                    gen: { id: gen_id, name: gen_name },
                    position: { id: position_id, name: position_name },
                    department: { id: department_id, name: department_name }
                };
            });
    }

    createOne(member, genIds, departmentId, positionId) {
        let memberId;
        return this.query()
            .insert(convertToSnakeCase(member))
            .returning('id')
            .then(([result]) => {
                memberId = result.id;
                const genIdValues = genIds.map(genId => ({
                    member_id: memberId,
                    gen_id: genId,
                    department_id: departmentId,
                    position_id: positionId,
                }));

                return this.query().insert(genIdValues).into('members_gens');
            })
            .then(() => this.query()
                .select('members.*', 'members_gens.gen_id as gen_id')
                .from('members')
                .innerJoin(
                    'members_gens',
                    'members.id',
                    'members_gens.member_id',
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
