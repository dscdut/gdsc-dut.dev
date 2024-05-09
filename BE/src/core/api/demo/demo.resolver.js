import { Module } from "packages/handler/Module";
import { DemoController } from "./demo.controller";
import { RecordId, uploadMediaSwagger } from "core/common/swagger";
import { RecordIdInterceptor } from "core/modules/interceptor/recordId/record-id.interceptor";
import { CreateDemoInterceptor, UpdateDemoInterceptor } from "core/modules/demo/interceptor";
import { MediaInterceptor } from "core/modules/document";
export const DemoResolver = Module.builder()

.addPrefix ({
    prefixPath: '/demo',
    tag: 'demo',
    module: 'DemoModule'
})
.register ([
    {
    route: '/',
    method: 'get',
    controller: DemoController.findAll
    },
    {
        route: '/:id', 
        method: 'get',
        params: [RecordId],
        interceptors: [RecordIdInterceptor],
        controller: DemoController.findById,
    },
    {
        route: '/',
        method: 'post',
        interceptors: [CreateDemoInterceptor],
        body: 'CreateDemoDto',
        controller: DemoController.createOne
    },
    {
        route: '/:id',
        method: 'put',
        params: [RecordId],
        interceptors: [UpdateDemoInterceptor],
        body: 'UpdateDemoDto',
        controller: DemoController.updateOne
    },
    {
        route: '/:id',
        method: 'delete',
        params: [RecordId],
        interceptors: [RecordIdInterceptor],
        controller: DemoController.deleteOne
    },
    {   
        route: '/image',
        method: 'post',
        params: [uploadMediaSwagger],
        consumes: ['multipart/form-data'],
        interceptors: [new MediaInterceptor(10)],
        body: 'UploadFileDto',
        controller: DemoController.uploadMany
    }
    // {
    //     route: '/image/:id',
    //     method: 'get',
    //     params: 


    // 

   
])

