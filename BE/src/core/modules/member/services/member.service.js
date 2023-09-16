import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { Optional } from '../../../utils';
import { NotFoundException } from '../../../../packages/httpException';
import { MemberRepository } from '../member.repository';
import { PositionService } from '../../position/services/position.service';
import { DepartmentService } from '../../department/services/department.service';
import { GenService } from '../../gen/services/gen.service';
import { MediaService } from '../../document';
import { MemberGenService } from '../../member_gen/service/member_gen.service';
import { ProductService } from '../../product/services/product.service';

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
        const promises = [];
        gens.forEach(gen => {
            promises.push(
                this.genService.findById(gen.gen_id),
                this.departmentService.findById(gen.departments_id),
                this.positionService.findById(gen.positions_id)
            );

            if (gen.products_id.length !== 1 && gen.products_id[0] !== 0) {
                gen.products_id.forEach(productId => {
                    promises.push(this.productService.findById(productId));
                });
            }
        });

        await Promise.all(promises);

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
        gens.map(gen => gen.products_id.map(productId => {
            membersGensIds.push({
                member_id: parseInt(id, 10),
                gen_id: gen.gen_id,
                department_id: gen.departments_id,
                position_id: gen.positions_id,
                product_id: productId
            });
            return null;
        }));
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
