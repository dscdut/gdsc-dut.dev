import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { ProductService } from '../../modules/product/services/product.service';
import { CreateProductDto, UpdateProductDto } from '../../modules/product/dto';
import searchProductSchema from './query/searchProduct.schema.json';

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
        await this.service.deleteOne(req.params.id);
        return ValidHttpResponse.toNoContentResponse();
    };

    findAll = async req => {
        const reqTransformed = new RequestTransformer(req.query, searchProductSchema);

        const data = await this.service.getAndCount(reqTransformed);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const ProductController = new Controller();
