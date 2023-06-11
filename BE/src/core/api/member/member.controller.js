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
        const groupByResults = data.content.reduce((acc, current) => {
            const existingItem = acc.find(item => item.id === current.id);
            if (existingItem) {
                existingItem.gen.push({
                    id: current.gen_id,
                    name: current.gen_name,
                });
                existingItem.department.push({
                    id: current.department_id,
                    name: current.department_name
                });
                existingItem.position.push({
                    id: current.position_id,
                    name: current.position_name
                });
            } else {
                acc.push({
                    id: current.id,
                    full_name: current.full_name,
                    birthday: current.birthday,
                    phone: current.phone,
                    email: current.email,
                    horoscope_sign: current.horoscope_sign,
                    philosophy: current.philosophy,
                    feelings: current.feelings,
                    infor_url: current.infor_url,
                    avatar_url: current.avatar_url,
                    gen: { id: current.gen_id, name: current.gen_name },
                    department: { id: current.department_id, name: current.department_name },
                    position: { id: current.position_id, name: current.position_name },
                    createdAt: current.createdAt,
                    updateAt: current.updateAt,
                    deleteAt: current.deleteAt
                });
            }
            return acc;
        }, []);

        const finalResult = Object.values(groupByResults).map(obj => {
            const { gen_id, gen_name, ...rest } = obj;
            return rest;
        });
        return ValidHttpResponse.toOkResponse(finalResult);
    };
}

export const MemberController = new Controller();
