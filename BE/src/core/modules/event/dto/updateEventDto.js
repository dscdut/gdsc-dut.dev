import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateEventDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' })
});

export const UpdateEventDto = body => ({
    name: body.name,
    imageUrl: body.image_url,
    description: body.description,
});
