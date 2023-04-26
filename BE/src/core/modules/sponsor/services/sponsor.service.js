import { FOLDER_NAME } from 'core/common/constants';
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

    async createOne(files, createSponsorDto) {
        const { genId, ...sponsor } = createSponsorDto;
        const gen = await this.genService.findById(genId);
        const uploadImageSponsor = await this.mediaService.uploadOne(files[0], FOLDER_NAME.SPONSORS);
        const imageId = uploadImageSponsor?.length && uploadImageSponsor[0]?.id;

        sponsor.imageId = imageId;

        return Optional.of(await this.repository.createOne(sponsor, gen.id))
            .throwIfNullable()
            .get();
    }

    async updateOne(id, updateSponsorDto) {
        return this.repository.updateOne(id, updateSponsorDto);
    }

    async deleteOne(id) {
        Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Sponsor with id ${id} not found`));
        await this.repository.deleteOne(id);
        return {
            message: `Delete sponsor with id ${id} successfully`,
            code: 'OK',
            status: 200,
        };
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
