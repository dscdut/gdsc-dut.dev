import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateMemberDto', {
    full_name: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    horoscope_sign: SwaggerDocument.ApiProperty({ type: 'string' }),
    philosophy: SwaggerDocument.ApiProperty({ type: 'string' }),
    feelings: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    department_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
    position_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
    gen_ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'int' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateMemberDto = body => ({
    fullName: body.full_name,
    birthday: body.birthday,
    phone: body.phone,
    email: body.email,
    horoscopeSign: body.horoscope_sign,
    philosophy: body.philosophy,
    feelings: body.feelings,
    inforUrl: body.infor_url,
    departmentIds: body.department_ids,
    positionIds: body.position_ids,
    genIds: body.gen_ids,
    imageId: body.image_id,
});
