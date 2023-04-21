import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { MemberRepository } from '../member.repository';
import { PositionService } from '../../position/services/position.service';
import { DepartmentService } from '../../department/services/department.service';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document';

class Service {
    constructor() {
        this.repository = MemberRepository;
        this.positionService = PositionService;
        this.departmentService = DepartmentService;
        this.genService = GenService;
        this.mediaService = MediaService;
    }

    async createOne(files, createMemberDto) {
        const {
            genId, positionId, departmentId, ...member
        } = createMemberDto;
        const department = await this.departmentService.findById(departmentId);
        const position = await this.positionService.findById(positionId);
        const gen = await this.genService.findById(genId);

        if (files) {
            const uploadedImage = await this.mediaService.uploadOne(
                files,
                'gdsc',
            );
            member.imageId = uploadedImage[0]['id'];
        }

        return Optional.of(
            await this.repository.createOne(
                member,
                gen.id,
                department.id,
                position.id,
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

    async findAll() {
        return this.repository.findAll();
    }

    async findMany(ids) {
        const members = await this.repository.findMany(ids);
        const getIds = members.map(member => member.id);
        const idsNotFound = ids.filter(item => !getIds.includes(item));

        if (getIds.length !== ids.length) {
            throw new NotFoundException(
                `Member with id ${idsNotFound} not found`,
            );
        }

        return members;
    }
}

export const MemberService = new Service();
