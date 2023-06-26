import { Optional } from '../../../utils';
import {
    NotFoundException,
} from '../../../../packages/httpException';
import { ProductRepository } from '../product.repository';
import { MemberService } from '../../member/services/member.service';
import { GenService } from '../../gen/services/gen.service';
import { MemberGenService } from '../../member_gen/service/member_gen.service';

class Service {
    constructor() {
        this.repository = ProductRepository;
        this.memberService = MemberService;
        this.genService = GenService;
        this.memberGenService = MemberGenService;
    }

    async createOne(createProductDto) {
        const { memberIds, genId, ...product } = createProductDto;
        await this.memberService.findMany(memberIds);
        await this.genService.findById(genId);
        const productId = (await this.repository.createOne(product))[0].id;
        memberIds.map(async memberId => {
            const memberGen = { member_id: memberId, gen_id: genId };
            const existingProduct = await this.memberGenService.checkExistingProduct(memberGen);
            Optional.of(await this.memberGenService.upsertOneProduct(existingProduct, productId, memberGen));
        });
    }

    async updateOne(id, updateProductDto) {
        return this.repository.updateOne(id, updateProductDto);
    }

    async deleteOne(id) {
        await this.findById(id);
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException((`Produtc with id ${id} not found`)))
            .get();
        return data;
    }

    async findAll() {
        return this.repository.findAll();
    }
}

export const ProductService = new Service();
