import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateDepartmentDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateDepartmentDto = body => ({
    name: body.name,
});
