import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { GenRepository } from '../gen.repository';

class Service {
    constructor() {
        this.repository = GenRepository;
    }

    async createOne(createGenDto) {
        return this.repository.createOne(createGenDto);
    }

    async updateOne(id, updateGenDto) {
        return this.repository.updateOne(id, updateGenDto);
    }

    async deleteOne(id) {
        Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Gen with id ${id} not found`));
        await this.repository.deleteOne(id);
        return {
            message: `Delete gen with id ${id} successfully`,
            code: 'OK',
            status: 200,
        };
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Gen with id ${id} not found`))
            .get();

        return data;
    }

    async findAll() {
        return this.repository.findAll().orderBy('created_at', 'desc');
    }
}

export const GenService = new Service();
