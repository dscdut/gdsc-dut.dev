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
}

export const MemberGenService = new Service();
