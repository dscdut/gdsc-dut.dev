import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateDemoDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateDemoDto = body =>({
    name: body.name
})