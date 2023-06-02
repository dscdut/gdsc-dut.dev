import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateSponsorDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    gen_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
});

export const UpdateSponsorDto = body => ({
    name: body.name,
    description: body.description,
    inforUrl: body.infor_url,
    imageId: body.image_id,
    genIds: body.gen_ids,
});
