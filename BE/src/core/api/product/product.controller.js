import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { ProductService } from '../../modules/product/services/product.service';
import { CreateProductDto, UpdateProductDto } from '../../modules/product/dto';

class Controller {
    constructor() {
        this.service = ProductService;
    }

    updateOne = async req => {
        await this.service.updateOne(req.params.id, UpdateProductDto(req.body));
        return ValidHttpResponse.toNoContentResponse();
    };

    createOne = async req => {
        const data = await this.service.createOne(CreateProductDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
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

export const ProductController = new Controller();
