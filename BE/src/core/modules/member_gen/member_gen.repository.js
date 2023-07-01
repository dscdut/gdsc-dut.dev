import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';
import { MemberService } from '../member/services/member.service';

class Repository extends DataRepository {
    constructor() {
        super();
        this.memberService = MemberService;
    }

    async checkExistingProduct(memberGenId) {
        return this.query().where(memberGenId).select('product_id').from('members_gens');
    }

    async findProduct(member_id) {
        return this.query().where('member_id', member_id).select('product_id').from('members_gens');
    }

    async findAllMembersGens(member_id) {
        return this.query().where('member_id', member_id).select('member_id', 'gen_id', 'department_id', 'position_id', 'product_id').from('members_gens');
    }

    async deleteAllMembersGens(member_id) {
        return this.query().where('member_id', member_id).delete('').from('members_gens');
    }

    async findDepPos(memberGen) {
        return this.query()
            .select('department_id', 'position_id')
            .from('members_gens')
            .where('member_id', memberGen.member_id)
            .andWhere('gen_id', memberGen.gen_id);
    }

    async upsertOneProduct(existingProduct, productId, memberGen) {
        if (existingProduct[0]?.product_id === null) {
            return this.query().update({ product_id: productId }).where('member_id', memberGen.member_id).andWhere('gen_id', memberGen.gen_id)
                .from('members_gens');
        }
        const updateMemberGen = await this.findDepPos(memberGen);
        const mergedObject = { ...updateMemberGen[0], ...memberGen, product_id: productId };
        return this.query()
            .insert(mergedObject)
            .into('members_gens');
    }
}

export const MemberGenRepository = new Repository('members_gens');
