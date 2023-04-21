import { Module } from 'packages/handler/Module';
import {
    CreateDepartmentInterceptor,
    UpdateDepartmentInterceptor,
} from 'core/modules/department/interceptor';
import { RecordIdInterceptor } from 'core/modules/interceptor/recordId/record-id.interceptor';
import { DepartmentController } from './department.controller';
import { RecordId } from '../../common/swagger/record-id';

export const DepartmentResolver = Module.builder()
    .addPrefix({
        prefixPath: '/departments',
        tag: 'departments',
        module: 'DepartmentModule',
    })
    .register([
        {
            route: '/:id',
            method: 'put',
            params: [RecordId],
            interceptors: [UpdateDepartmentInterceptor],
            body: 'UpdateDepartmentDto',
            controller: DepartmentController.updateOne,
        },
        {
            route: '/',
            method: 'post',
            interceptors: [CreateDepartmentInterceptor],
            body: 'CreateDepartmentDto',
            controller: DepartmentController.createOne,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: DepartmentController.findById,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            interceptors: [RecordIdInterceptor],
            controller: DepartmentController.deleteOne,
        },
        {
            route: '/',
            method: 'get',
            controller: DepartmentController.findAll,
        },
    ]);
