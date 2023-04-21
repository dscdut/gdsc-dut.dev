import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateGenDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateGenDto = body => ({
    name: body.name,
});
