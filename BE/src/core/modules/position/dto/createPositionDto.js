import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreatePositionDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const CreatePositionDto = body => ({
    name: body.name,
});
