import { Optional } from '../../../utils';
import {
    NotFoundException,
} from '../../../../packages/httpException';
import { DepartmentRepository } from '../department.repository';

class Service {
    constructor() {
        this.repository = DepartmentRepository;
    }

    async createOne(createDepartmentDto) {
        return this.repository.insert(createDepartmentDto);
    }

    async updateOne(id, updateDepartmentDto) {
        await this.findById(id);
        return this.repository.updateOne(id, updateDepartmentDto);
    }

    async deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Department with id ${id} not found`))
            .get();
        return data;
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findMany(ids) {
        const uniqueIds = [...new Set(ids)];
        const departments = await this.repository.findMany(uniqueIds);
        const departmentIds = departments.map(department => department.id);
        const idsNotFound = ids.filter(item => !departmentIds.includes(item));

        if (departmentIds.length !== uniqueIds.length) {
            throw new NotFoundException(`Department with id ${idsNotFound} not found`);
        }

        return departments;
    }
}

export const DepartmentService = new Service();
