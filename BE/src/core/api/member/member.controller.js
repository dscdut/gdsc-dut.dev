import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { MemberService } from '../../modules/member/services/member.service';
import { CreateMemberDto, UpdateMemberDto } from '../../modules/member/dto';
import searchMemberSchema from './query/searchMember.schema.json';

class Controller {
    constructor() {
        this.service = MemberService;
    }

    updateOne = async req => {
        await this.service.updateOne(req.params.id, UpdateMemberDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.service.createOne(CreateMemberDto(req.body));
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

    findAll = async req => {
        const reqTransformed = new RequestTransformer(req.query, searchMemberSchema);
        const data = await this.service.getAndCount(reqTransformed);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const MemberController = new Controller();
