import { uploadMediaSwagger } from 'core/common/swagger';
import { deleteMediasInterceptor, MediaInterceptor } from 'core/modules/document';
import { Module } from 'packages/handler/Module';
import { MediaController } from './media.controller';

export const MediaResolver = Module.builder()
    .addPrefix({
        prefixPath: '/media',
        tag: 'media',
        module: 'MediaModule'
    })
    .register([
        {
            route: '/images',
            method: 'post',
            params: [uploadMediaSwagger],
            consumes: ['multipart/form-data'],
            interceptors: [new MediaInterceptor(10)],
            body: 'UploadFileDto',
            controller: MediaController.uploadMany,
        },
        {
            route: '/images',
            method: 'delete',
            interceptors: [deleteMediasInterceptor],
            body: 'DeleteFileDto',
            controller: MediaController.deleteMany,
        },
    ]);
