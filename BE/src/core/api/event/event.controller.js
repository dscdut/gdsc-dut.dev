import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { EventService } from '../../modules/event/services/event.service';
import { CreateEventDto, UpdateEventDto } from '../../modules/event/dto';

class Controller {
    constructor() {
        this.service = EventService;
    }

    updateOne = async req => {
        const data = await this.service.updateOne(req.params.id, UpdateEventDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    createOne = async req => {
        const data = await this.service.createOne(CreateEventDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    findById = async req => {
        const data = await this.service.findById(req.params.id);
        return data && ValidHttpResponse.toOkResponse(data);
    };

    deleteOne = async req => {
        await this.service.deleteOne(req.params.id);
        return ValidHttpResponse.toNoContentResponse();
    };

    findAll = async () => {
        const data = await this.service.findAll();
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const EventController = new Controller();
