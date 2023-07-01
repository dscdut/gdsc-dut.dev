import { MemberGenRepository } from '../member_gen.repository';

class Service {
    constructor() {
        this.repository = MemberGenRepository;
    }

    async checkExistingProduct(memberGenId) {
        return this.repository.checkExistingProduct(memberGenId);
    }

    async upsertOneProduct(existingProduct, productId, memberGen) {
        return this.repository.upsertOneProduct(existingProduct, productId, memberGen);
    }

    async findProduct(member_id) {
        return this.repository.findProduct(member_id);
    }

    async findAllMembersGens(member_id) {
        return this.repository.findAllMembersGens(member_id);
    }
}

export const MemberGenService = new Service();
