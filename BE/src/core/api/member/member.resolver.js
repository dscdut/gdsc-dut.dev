import { Module } from 'packages/handler/Module';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import {
    CreateMemberInterceptor,
    UpdateMemberInterceptor,
} from 'core/modules/member/interceptor';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { RecordId } from '../../common/swagger/record-id';
import { MemberController } from './member.controller';

export const MemberResolver = Module.builder()
    .addPrefix({
        prefixPath: '/members',
        tag: 'members',
        module: 'MemberModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateMemberInterceptor],
            body: 'UpdateMemberDto',
            controller: MemberController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateMemberInterceptor],
            body: 'CreateMemberDto',
            controller: MemberController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: MemberController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: MemberController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: MemberController.findAll,
        },
    ]);
