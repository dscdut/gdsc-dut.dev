import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateDepartmentDto', {
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const CreateDepartmentDto = body => ({
    name: body.name,
});
