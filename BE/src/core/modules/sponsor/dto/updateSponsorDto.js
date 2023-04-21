import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateSponsorDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateSponsorDto = body => ({
    name: body.name,
    image_url: body.image_url,
    description: body.description,
    infor_url: body.infor_url,
});
