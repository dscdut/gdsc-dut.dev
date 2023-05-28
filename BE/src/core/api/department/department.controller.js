import { DepartmentService } from '../../modules/department/services/department.service';
import {
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from '../../modules/department/dto';
import { ValidHttpResponse } from '../../../packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.services = DepartmentService;
    }

    updateOne = async req => {
        await this.services.updateOne(req.params.id, UpdateDepartmentDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.services.createOne(CreateDepartmentDto(req.body));
        return ValidHttpResponse.toOkResponse(data[0]);
    };

    findById = async req => {
        const data = await this.services.findById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    deleteOne = async req => {
        const data = await this.services.deleteOne(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    findAll = async () => {
        const data = await this.services.findAll();
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const DepartmentController = new Controller();
