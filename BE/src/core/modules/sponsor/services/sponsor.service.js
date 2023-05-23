import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { SponsorRepository } from '../sponsor.repository';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document/service/media.service';

class Service {
    constructor() {
        this.repository = SponsorRepository;
        this.genService = GenService;
        this.mediaService = MediaService;
    }

    async createOne(createSponsorDto) {
        const { genId, imageId, ...sponsor } = createSponsorDto;
        const gen = await this.genService.findById(genId);
        await this.mediaService.findById(imageId);
        const updateSponsor = { ...sponsor, imageId };

        return Optional.of(await this.repository.createOne(updateSponsor, gen.id))
            .throwIfNullable()
            .get();
    }

    async updateOne(id, updateSponsorDto) {
        return this.repository.updateOne(id, updateSponsorDto);
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
export const SponsorService = new Service();
