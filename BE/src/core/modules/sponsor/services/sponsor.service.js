import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { SponsorRepository } from '../sponsor.repository';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document/service/media.service';
import { getUniqueElements } from '../../../helpers/convert.helper';

class Service {
    constructor() {
        this.repository = SponsorRepository;
        this.genService = GenService;
        this.mediaService = MediaService;
    }

    async createOne(createSponsorDto) {
        const { genIds, imageId, ...sponsor } = createSponsorDto;
        await this.genService.findMany(genIds);
        await this.mediaService.findById(imageId);
        const updateSponsor = { ...sponsor, imageId };
        return Optional.of(await this.repository.createOne(updateSponsor, genIds))
            .throwIfNullable()
            .get();
    }

    async updateOne(id, updateSponsorDto) {
        const { genIds, ...sponsor } = updateSponsorDto;
        await this.findById(id);
        await this.genService.findMany(genIds);
        await this.mediaService.findById(updateSponsorDto.imageId);
        const newGens = genIds;
        const OldGens = await this.genService.findManyGenBySponsorId(id);
        const upsertGen = getUniqueElements(OldGens, newGens);
        if (upsertGen.length === 0) {
            return Optional.of(await this.repository.updateOne(id, sponsor))
                .throwIfNullable()
                .get();
        }
        return Optional.of(await this.repository.upsertOne(id, upsertGen), await this.repository.updateOne(id, sponsor))
            .throwIfNullable()
            .get();
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException((`Sponsor with id ${id} not found`)))
            .get();
        return data;
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findMany(ids) {
        const sponsors = await this.repository.findMany(ids);
        const sponsorIds = sponsors.map(sponsor => sponsor.id);
        const idsNotFound = ids.filter(item => !sponsorIds.includes(item));

        if (sponsorIds.length !== ids.length) {
            throw new NotFoundException(`Sponsor with id ${idsNotFound} not found`);
        }

        return sponsors;
    }
}
export const SponsorService = new Service();
