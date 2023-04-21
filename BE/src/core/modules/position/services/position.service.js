import { Optional } from '../../../utils';
import {
    NotFoundException,
} from '../../../../packages/httpException';
import { PositionRepository } from '../position.repository';

class Service {
    constructor() {
        this.repository = PositionRepository;
    }

    async createOne(createPostionDto) {
        return this.repository.createOne(createPostionDto);
    }

    async updateOne(id, updatePostionDto) {
        return this.repository.updateOne(id, updatePostionDto);
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Position with id ${id} not found`))
            .get();
        return data;
    }

    async findAll() {
        return this.repository.findAll();
    }
}

export const PositionService = new Service();
