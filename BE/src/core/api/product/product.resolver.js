import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreateProductInterceptor,
    UpdateProductInterceptor,
} from 'core/modules/product/interceptor';
import { RecordId } from '../../common/swagger/record-id';
import { ProductController } from './product.controller';

export const ProductResolver = Module.builder()
    .addPrefix({
        prefixPath: '/products',
        tag: 'products',
        module: 'ProductModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateProductInterceptor],
            body: 'UpdateProductDto',
            controller: ProductController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateProductInterceptor],
            body: 'CreateProductDto',
            controller: ProductController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: ProductController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: ProductController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            controller: ProductController.findAll,
        },
    ]);
