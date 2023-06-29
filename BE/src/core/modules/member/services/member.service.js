import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { MemberRepository } from '../member.repository';
import { PositionService } from '../../position/services/position.service';
import { DepartmentService } from '../../department/services/department.service';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document';

class Service extends DataPersistenceService {
    constructor() {
        super(MemberRepository);
        this.positionService = PositionService;
        this.departmentService = DepartmentService;
        this.genService = GenService;
        this.mediaService = MediaService;
        this.repository = MemberRepository;
    }

    async createOne(createMemberDto) {
        const {
            gens, imageId, ...member
        } = createMemberDto;
        for (let i = 0; i < gens.length; i++) {
            await this.genService.findById(gens[i].gen_id);
            await this.departmentService.findById(gens[i].department_id);
            await this.positionService.findById(gens[i].position_id);
        }
        const image = await this.mediaService.findById(imageId);

        return Optional.of(
            await this.repository.createOne(
                { ...member, image_id: image.id },
                gens
            ),
        ).get();
    }

    async updateOne(id, updateMemberDto) {
        await this.findById(id);
        const {
            gens, imageId, ...member
        } = updateMemberDto;
        const image = await this.mediaService.findById(imageId);
        return this.repository.updateOne(id, { ...member, image_id: image.id }, gens);
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(
                new NotFoundException(`Member with id ${id} not found`),
            )
            .get();
        return data;
    }

    async findMany(ids) {
        const members = await this.repository.findMany(ids);
        const getIds = members.map(member => member.id);
        const idsNotFound = ids.filter(item => !getIds.includes(item));

        if (getIds.length !== ids.length) {
            throw new NotFoundException(`Member with id ${idsNotFound} not found`);
        }

        return members;
    }
}

export const MemberService = new Service();
