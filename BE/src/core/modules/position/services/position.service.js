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

    async findMany(ids) {
        const uniqueIds = [...new Set(ids)];
        const positions = await this.repository.findMany(uniqueIds);
        const positionIds = positions.map(position => position.id);
        const idsNotFound = ids.filter(item => !positionIds.includes(item));

        if (positionIds.length !== uniqueIds.length) {
            throw new NotFoundException(`Position with id ${idsNotFound} not found`);
        }

        return positions;
    }
}

export const PositionService = new Service();
