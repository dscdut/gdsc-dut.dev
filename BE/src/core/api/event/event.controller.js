import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { EventService } from '../../modules/event/services/event.service';
import { CreateEventDto, UpdateEventDto } from '../../modules/event/dto';
import searchEventSchema from './query/searchEvent.schema.json';

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

    findAll = async req => {
        const reqTransformed = new RequestTransformer(req.query, searchEventSchema);
        const data = await this.service.getAndCount(reqTransformed);
        const groupByResults = data.content.reduce((acc, current) => {
            const existingItem = acc.find(item => item.id === current.id);
            if (existingItem) {
                if (!existingItem.gen) existingItem.gen = [];
                if (!existingItem.sponsors) existingItem.sponsors = [];
                existingItem.sponsors.push({
                    id: current.sponsor_id,
                    name: current.sponsor_name
                });
            } else {
                acc.push({
                    id: current.id,
                    name: current.name,
                    description: current.description,
                    infor_url: current.infor_url,
                    avatar_url: current.avatar_url,
                    gen: { id: current.gen_id, name: current.gen_name },
                    sponsors: [{ id: current.sponsor_id, name: current.sponsor_name }],
                });
            }
            return acc;
        }, []);

        const finalResult = Object.values(groupByResults).map(obj => {
            const {
                gen_id, gen_name, sponsor_id, sponsor_name, ...rest
            } = obj;
            return rest;
        });
        return ValidHttpResponse.toOkResponse(finalResult);
    };
}

export const EventController = new Controller();
