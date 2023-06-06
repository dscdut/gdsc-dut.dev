import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { SponsorService } from '../../modules/sponsor/services/sponsor.service';
import { CreateSponsorDto, UpdateSponsorDto } from '../../modules/sponsor/dto';
import searchSponsorSchema from './query/searchSponsor.schema.json';

class Controller {
    constructor() {
        this.service = SponsorService;
    }

  updateOne = async req => {
      const data = await this.service.updateOne(req.params.id, UpdateSponsorDto(req.body));
      return data && ValidHttpResponse.toCreatedResponse(data);
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
      await this.service.deleteOne(req.params.id);
      return ValidHttpResponse.toNoContentResponse();
  };

  findAll = async req => {
      const reqTransformed = new RequestTransformer(req.query, searchSponsorSchema);
      const data = await this.service.getAndCount(reqTransformed);
      const groupByResults = data.content.reduce((acc, current) => {
          const existingItem = acc.find(item => item.id === current.id);
          if (existingItem) {
              existingItem.gens.push({
                  id: current.gen_id,
                  name: current.gen_name,
              });
          } else {
              acc.push({
                  id: current.id,
                  name: current.name,
                  description: current.description,
                  infor_url: current.infor_url,
                  avatar_url: current.avatar_url,
                  gens: [{ id: current.gen_id, name: current.gen_name }],
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

export const SponsorController = new Controller();
