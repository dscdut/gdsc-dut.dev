import { Optional } from '../../../utils';
import {
    NotFoundException,
} from '../../../../packages/httpException';
import { ProductRepository } from '../product.repository';
import { MemberService } from '../../member/services/member.service';

class Service {
    constructor() {
        this.repository = ProductRepository;
        this.memberService = MemberService;
    }

    async createOne(createProductDto) {
        const { memberIds, ...product } = createProductDto;
        await this.memberService.findMany(memberIds);
        return Optional.of(await this.repository.createOne(product, memberIds));
    }

    async updateOne(id, updateProductDto) {
        return this.repository.updateOne(id, updateProductDto);
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException())
            .get();
        return data;
    }

    async findAll() {
        return this.repository.findAll();
    }
}

export const ProductService = new Service();
