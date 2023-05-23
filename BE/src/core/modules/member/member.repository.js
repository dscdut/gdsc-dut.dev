import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { convertToSnakeCase } from '../../helpers/convert.helper';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .where('members.id', id)
            .select([
                'members.id',
                'images.url as avatar_url',
                'members.full_name',
                'members.birthday',
                'members.horoscope_sign',
                'members.philosophy',
                'members.feelings',
                'members.infor_url',
                'gens.name as gen',
                'members.deleted_at',
                'members.created_at',
                'members.updated_at',
            ])
            .innerJoin('images', 'members.image_id', 'images.id')
            .innerJoin('members_gens', 'members.id', 'members_gens.member_id')
            .innerJoin('gens', 'members_gens.gen_id', 'gens.id')
            .first();
    }

    findAll() {
        return this.query()
            .select([
                'members.id',
                'images.url as avatar_url',
                'members.full_name',
                'members.birthday',
                'members.horoscope_sign',
                'members.philosophy',
                'members.feelings',
                'members.infor_url',
                'gens.name as gen',
                'members.deleted_at',
                'members.created_at',
                'members.updated_at',
            ])
            .innerJoin('images', 'members.image_id', 'images.id')
            .innerJoin('members_gens', 'members.id', 'members_gens.member_id')
            .innerJoin('gens', 'members_gens.gen_id', 'gens.id');
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
        return this.query().where('id', id).del();
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }

    findMany(ids) {
        return this.query().select('*').from('members').whereIn('id', ids);
    }
}

export const MemberRepository = new Repository('members');
