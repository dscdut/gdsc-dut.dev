import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreateEventInterceptor,
    UpdateEventInterceptor,
} from 'core/modules/event/interceptor';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { RecordId } from '../../common/swagger/record-id';
import { EventController } from './event.controller';

export const EventResolver = Module.builder()
    .addPrefix({
        prefixPath: '/events',
        tag: 'events',
        module: 'EventModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateEventInterceptor],
            body: 'UpdateEventDto',
            controller: EventController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateEventInterceptor],
            body: 'CreateEventDto',
            controller: EventController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: EventController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: EventController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: EventController.findAll,
        },
    ]);
