import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateGenDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const CreateGenDto = body => ({
    name: body.name,
});
