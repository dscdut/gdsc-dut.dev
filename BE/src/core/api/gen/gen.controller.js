import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { GenService } from '../../modules/gen/services/gen.service';
import { CreateGenDto, UpdateGenDto } from '../../modules/gen/dto';

class Controller {
    constructor() {
        this.service = GenService;
    }

  updateOne = async req => {
      await this.service.updateOne(req.params.id, UpdateGenDto(req.body));
      return ValidHttpResponse.toNoContentResponse();
  };

  createOne = async req => {
      const data = await this.service.createOne(CreateGenDto(req.body));
      return ValidHttpResponse.toOkResponse(data[0]);
  };

  findById = async req => {
      const data = await this.service.findById(req.params.id);
      return ValidHttpResponse.toOkResponse(data);
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

export const GenController = new Controller();
