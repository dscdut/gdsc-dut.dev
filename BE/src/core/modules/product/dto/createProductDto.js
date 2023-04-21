import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateProductDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    member_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
});

export const CreateProductDto = body => ({
    name: body.name,
    imageId: body.image_id,
    description: body.description,
    inforUrl: body.infor_url,
    memberIds: body.member_ids
});
