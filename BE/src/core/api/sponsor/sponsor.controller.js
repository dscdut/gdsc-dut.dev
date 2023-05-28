import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { SponsorService } from '../../modules/sponsor/services/sponsor.service';
import { CreateSponsorDto, UpdateSponsorDto } from '../../modules/sponsor/dto';

class Controller {
    constructor() {
        this.service = SponsorService;
    }

    updateOne = async req => {
        await this.service.updateOne(req.params.id, UpdateSponsorDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.service.createOne(CreateSponsorDto(req.body));
        return data && ValidHttpResponse.toCreatedResponse(data);
    };

    findById = async req => {
        const data = await this.service.findById(req.params.id);
        return data && ValidHttpResponse.toOkResponse(data);
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

export const SponsorController = new Controller();
