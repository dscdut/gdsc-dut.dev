import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateEventDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    sponsor_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
    gen_id: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateEventDto = body => ({
    name: body.name,
    description: body.description,
    imageId: body.image_id,
    sponsorIds: body.sponsor_ids,
    genId: body.gen_id,
});
