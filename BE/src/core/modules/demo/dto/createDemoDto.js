import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateDemoDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const CreateDemoDto = body => ({
    name: body.name,
});