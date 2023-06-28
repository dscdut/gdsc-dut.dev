import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { MemberRepository } from '../member.repository';
import { PositionService } from '../../position/services/position.service';
import { DepartmentService } from '../../department/services/department.service';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document';
import { checkDuplicateElements } from '../../../helpers/convert.helper';

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
            genIds, positionIds, departmentIds, imageId, ...member
        } = createMemberDto;
        if (genIds.length < positionIds.length || genIds.length < departmentIds.length) {
            throw new NotFoundException('Gen must greater equal to department, position');
        }
        if (checkDuplicateElements(genIds) === true) {
            throw new NotFoundException('Gen must not coincide');
        }
        await this.departmentService.findMany(departmentIds);
        await this.positionService.findMany(positionIds);
        await this.genService.findMany(genIds);
        const image = await this.mediaService.findById(imageId);

        return Optional.of(
            await this.repository.createOne(
                { ...member, image_id: image.id },
                genIds,
                departmentIds,
                positionIds
            ),
        ).get();
    }

    async updateOne(id, updateMemberDto) {
        return this.repository.updateOne(id, updateMemberDto);
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
