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
        return this.repository.updateOne(id, updateDepartmentDto);
    }

    async deleteOne(id) {
        Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Department with id ${id} not found`));
        await this.repository.deleteOne(id);
        return {
            message: `Delete department with id ${id} successfully`,
            code: 'OK',
            status: 200,
        };
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
}

export const DepartmentService = new Service();
