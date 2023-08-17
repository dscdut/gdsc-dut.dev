import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { times } from 'lodash';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { MemberRepository } from '../member.repository';
import { PositionService } from '../../position/services/position.service';
import { DepartmentService } from '../../department/services/department.service';
import { MemberGenService } from '../../member_gen/service/member_gen.service';
import { ProductService } from '../../product/services/product.service';
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
        this.memberGenService = MemberGenService;
        this.productService = ProductService;
    }

    async createOne(createMemberDto) {
        const {
            gens, imageId, ...member
        } = createMemberDto;
        for (let i = 0; i < gens.length; i++) {
            await this.genService.findById(gens[i].gen_id);
            await this.departmentService.findById(gens[i].departments_id);
            await this.positionService.findById(gens[i].positions_id);
            for (let j = 0; j < gens[i].products_id.length; j++) {
                await this.productService.findById(gens[i].products_id[j]);
            }
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
        const membersGensIds = [];
        gens.map(gen => {
            gen.products.map(product => {
                membersGensIds.push({
                    member_id: parseInt(id),
                    gen_id: gen.gen.gen_id,
                    department_id: gen.department.department_id,
                    position_id: gen.position.position_id,
                    product_id: product.product_id
                });
            });
        });
        await this.memberGenService.deleteMembersGens(id);
        return this.repository.updateOne(id, { ...member, image_id: image.id }, membersGensIds);
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
