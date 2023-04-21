import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreateGenInterceptor,
    UpdateGenInterceptor,
} from 'core/modules/gen/interceptor';
import { RecordId } from '../../common/swagger/record-id';
import { GenController } from './gen.controller';

export const GenResolver = Module.builder()
    .addPrefix({
        prefixPath: '/gens',
        tag: 'gens',
        module: 'GenModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateGenInterceptor],
            body: 'UpdateGenDto',
            controller: GenController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateGenInterceptor],
            body: 'CreateGenDto',
            controller: GenController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: GenController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: GenController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            controller: GenController.findAll,
        },
    ]);
