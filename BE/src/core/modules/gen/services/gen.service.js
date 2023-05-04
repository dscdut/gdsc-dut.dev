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
        return this.repository.deleteOne(id);
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

    async findMany(ids) {
        const gens = await this.repository.findMany(ids);
        const getIds = gens.map(gen => gen.id);
        const idsNotFound = ids.filter(item => !getIds.includes(item));

        if (getIds.length !== ids.length) {
            throw new NotFoundException(`Gen with id ${idsNotFound} not found`);
        }

        return gens;
    }
}

export const GenService = new Service();
