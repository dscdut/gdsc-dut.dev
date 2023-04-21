import { SwaggerDocument } from '../../../packages/swagger';
import { ApiDocument } from '../../config/swagger.config';

ApiDocument.addModel('UploadFileDto',
    {
        folder_name: SwaggerDocument.ApiProperty({ type: 'string' }),
    });

export const UploadFileDto = body => ({
    folderName: body.folder_name
});

export const CreateMediaDto = body => ({
    url: body.url,
    publicId: body.public_id,
    originalFilename: body.original_filename,
});
