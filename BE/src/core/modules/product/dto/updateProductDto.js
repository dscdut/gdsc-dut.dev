import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateProductDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateProductDto = body => ({
    name: body.name,
    imageId: body.image_id,
    description: body.description,
    inforUrl: body.infor_url,
});
