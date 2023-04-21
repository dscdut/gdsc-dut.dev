import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { MemberService } from '../../modules/member/services/member.service';
import { CreateMemberDto, UpdateMemberDto } from '../../modules/member/dto';

class Controller {
    constructor() {
        this.service = MemberService;
    }

    updateOne = async req => {
        await this.service.updateOne(req.params.id, UpdateMemberDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.service.createOne(
            req.file,
            CreateMemberDto(req.body),
        );
        return data && ValidHttpResponse.toCreatedResponse(data);
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

export const MemberController = new Controller();
