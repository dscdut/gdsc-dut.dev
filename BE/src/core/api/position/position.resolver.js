import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreatePositionInterceptor,
    UpdatePositionInterceptor,
} from 'core/modules/position/interceptor';
import { RecordId } from '../../common/swagger/record-id';
import { PositionController } from './position.controller';

export const PositionResolver = Module.builder()
    .addPrefix({
        prefixPath: '/positions',
        tag: 'positions',
        module: 'PositionModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdatePositionInterceptor],
            body: 'UpdatePositionDto',
            controller: PositionController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreatePositionInterceptor],
            body: 'CreatePositionDto',
            controller: PositionController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: PositionController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: PositionController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            controller: PositionController.findAll,
        },
    ]);
