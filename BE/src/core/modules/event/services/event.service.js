import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { MediaService } from 'core/modules/document';
import { GenService } from '../../gen/services/gen.service';
import { SponsorService } from '../../sponsor/services/sponsor.service';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { EventRepository } from '../event.repository';

class Service extends DataPersistenceService {
    constructor() {
        super(EventRepository);
        this.repository = EventRepository;
        this.mediaService = MediaService;
        this.genService = GenService;
        this.sponsorService = SponsorService;
    }

    async createOne(createEventDto) {
        const { genId, sponsorIds, ...event } = createEventDto;
        await this.mediaService.findById(createEventDto.imageId);
        await this.genService.findById(genId);
        await this.sponsorService.findMany(sponsorIds);
        return Optional.of(await this.repository.createOne(event, sponsorIds, genId))
            .throwIfNullable()
            .get();
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
