import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreateSponsorInterceptor,
    UpdateSponsorInterceptor,
} from 'core/modules/sponsor/interceptor';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { RecordId } from '../../common/swagger/record-id';
import { SponsorController } from './sponsor.controller';

export const SponsorResolver = Module.builder()
    .addPrefix({
        prefixPath: '/sponsors',
        tag: 'sponsors',
        module: 'sponsorModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateSponsorInterceptor],
            body: 'UpdateSponsorDto',
            controller: SponsorController.updateOne,
            preAuthorization: true,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateSponsorInterceptor],
            body: 'CreateSponsorDto',
            controller: SponsorController.createOne,
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: SponsorController.findById,
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: SponsorController.deleteOne,
            preAuthorization: true,
        },
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: SponsorController.findAll,
            preAuthorization: true,
        },
    ]);
