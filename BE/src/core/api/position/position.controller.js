import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { PositionService } from '../../modules/position/services/position.service';
import {
    CreatePositionDto,
    UpdatePositionDto,
} from '../../modules/position/dto';

class Controller {
    constructor() {
        this.service = PositionService;
    }

    updateOne = async req => {
        await this.service.updateOne(req.params.id, UpdatePositionDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.service.createOne(CreatePositionDto(req.body));
        return ValidHttpResponse.toOkResponse(data[0]);
    };

    findById = async req => {
        const data = await this.service.findById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    deleteOne = async req => {
        const data = await this.service.deleteOne(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    findAll = async () => {
        const data = await this.service.findAll();
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PositionController = new Controller();
