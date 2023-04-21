import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdatePositionDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdatePositionDto = body => ({
    name: body.name,
});
