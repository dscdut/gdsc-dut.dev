import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateSponsorDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    description: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    gen_id: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateSponsorDto = body => ({
    name: body.name,
    description: body.description,
    inforUrl: body.infor_url,
    genId: body.gen_id,
});
