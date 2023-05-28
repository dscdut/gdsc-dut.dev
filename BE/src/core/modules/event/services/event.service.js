import { MediaService } from 'core/modules/document';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { EventRepository } from '../event.repository';

class Service {
    constructor() {
        this.repository = EventRepository;
        this.mediaService = MediaService;
    }

    async createOne(createEventDto) {
        await this.mediaService.findById(createEventDto.imageId);
        return this.repository.createOne(createEventDto);
    }

    async updateOne(id, updateEventDto) {
        await this.findById(id);
        await this.mediaService.findById(updateEventDto.imageId);
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
