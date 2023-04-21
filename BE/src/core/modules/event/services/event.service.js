import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { EventRepository } from '../event.repository';

class Service {
    constructor() {
        this.repository = EventRepository;
    }

    async createOne(createEventDto) {
        return this.repository.createOne(createEventDto);
    }

    async updateOne(id, updateEventDto) {
        return this.repository.updateOne(id, updateEventDto);
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        return Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Event with id ${id} not found`))
            .get();
    }

    async findAll() {
        return this.repository.findAll();
    }
}

export const EventService = new Service();
