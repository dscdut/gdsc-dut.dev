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
        const result = {};
        const genMap = new Map();
        const departmentArr = [];
        const positionArr = [];

        for (const item of data) {
            const genId = item.gen_id;
            const genName = item.gen_name;
            const departmentId = item.department_id;
            const departmentName = item.department_name;
            const positionId = item.position_id;
            const positionName = item.position_name;
            if (!genMap.has(genId)) {
                genMap.set(genId, { id: genId, name: genName });
            }
            departmentArr.push({ id: departmentId, name: departmentName });
            positionArr.push({ id: positionId, name: positionName });
        }

        result.id = data[0].id;
        result.full_name = data[0].full_name;
        result.birthday = data[0].birthday;
        result.phone = data[0].phone;
        result.email = data[0].email;
        result.horoscope_sign = data[0].horoscope_sign;
        result.philosophy = data[0].philosophy;
        result.feelings = data[0].feelings;
        result.infor_url = data[0].infor_url;
        result.deleted_at = data[0].deleted_at;
        result.created_at = data[0].created_at;
        result.updated_at = data[0].updated_at;
        result.image_id = { id: data[0].image_id, url: data[0].image_url };
        result.gen = Array.from(genMap.values());
        result.department = departmentArr;
        result.position = positionArr;

        return data && ValidHttpResponse.toCreatedResponse(result);
    };

    findById = async req => {
        const data = await this.service.findById(req.params.id);
        const result = {};
        const genMap = new Map();
        const departmentArr = [];
        const positionArr = [];

        for (const item of data) {
            const genId = item.gen_id;
            const genName = item.gen_name;
            const departmentId = item.department_id;
            const departmentName = item.department_name;
            const positionId = item.position_id;
            const positionName = item.position_name;
            if (!genMap.has(genId)) {
                genMap.set(genId, { id: genId, name: genName });
            }
            departmentArr.push({ id: departmentId, name: departmentName });
            positionArr.push({ id: positionId, name: positionName });
        }

        result.id = data[0].id;
        result.full_name = data[0].full_name;
        result.birthday = data[0].birthday;
        result.phone = data[0].phone;
        result.email = data[0].email;
        result.horoscope_sign = data[0].horoscope_sign;
        result.philosophy = data[0].philosophy;
        result.feelings = data[0].feelings;
        result.infor_url = data[0].infor_url;
        result.deleted_at = data[0].deleted_at;
        result.created_at = data[0].created_at;
        result.updated_at = data[0].updated_at;
        result.image_id = { id: data[0].image_id, url: data[0].image_url };
        result.gen = Array.from(genMap.values());
        result.department = departmentArr;
        result.position = positionArr;

        return data && ValidHttpResponse.toOkResponse(result);
    };

    deleteOne = async req => {
        await this.service.deleteOne(req.params.id);
        return ValidHttpResponse.toNoContentResponse();
    };

    findAll = async req => {
        const reqTransformed = new RequestTransformer(req.query, searchMemberSchema);
        const data = await this.service.getAndCount(reqTransformed);
        const groupByResults = data.content.reduce((acc, current) => {
            if (acc[current.id]) {
                if (Array.isArray(acc[current.id].gens)) {
                    acc[current.id].gens.push({
                        id: current.gen_id,
                        name: current.gen_name,
                    });
                } else {
                    acc[current.id].gens = [
                        { id: current.gen_id, name: current.gen_name },
                    ];
                }

                if (Array.isArray(acc[current.id].departments)) {
                    acc[current.id].departments.push({
                        id: current.department_id,
                        name: current.department_name,
                    });
                } else {
                    acc[current.id].departments = [
                        { id: current.department_id, name: current.department_name },
                    ];
                }

                if (Array.isArray(acc[current.id].positions)) {
                    acc[current.id].positions.push({
                        id: current.position_id,
                        name: current.position_name,
                    });
                } else {
                    acc[current.id].positions = [
                        { id: current.position_id, name: current.position_name },
                    ];
                }
            } else {
                acc[current.id] = {
                    ...current,
                    gens: [{ id: current.gen_id, name: current.gen_name }],
                    departments: [{ id: current.department_id, name: current.department_name }],
                    positions: [{ id: current.position_id, name: current.position_name }],
                    image: { id: current.image_id, url: current.image_url },
                };

                delete acc[current.id].image_id;
                delete acc[current.id].image_url;
            }
            return acc;
        }, {});
        const finalResult = Object.values(groupByResults).map(obj => {
            const {
                gen_id, gen_name, department_id, department_name, position_id, position_name, ...rest
            } = obj;
            return rest;
        });
        return ValidHttpResponse.toOkResponse(finalResult);
    };
}

export const MemberController = new Controller();
