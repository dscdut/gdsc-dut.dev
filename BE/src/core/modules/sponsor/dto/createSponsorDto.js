import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateSponsorDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    gen_id: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateSponsorDto = body => ({
    name: body.name,
    description: body.description,
    inforUrl: body.infor_url,
    imageId: body.image_id,
    genId: body.gen_id,
});
