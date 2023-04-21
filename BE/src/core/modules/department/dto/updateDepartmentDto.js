import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateDepartment', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateDepartmentDto = body => ({
    name: body.name,
});
