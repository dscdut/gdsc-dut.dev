import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateMemberDto', {
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    full_name: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    horoscope_sign: SwaggerDocument.ApiProperty({ type: 'string' }),
    philosophy: SwaggerDocument.ApiProperty({ type: 'string' }),
    feelings: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const UpdateMemberDto = body => ({
    imageId: body.image_id,
    full_name: body.full_name,
    birthday: body.birthday,
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    horoscopeSign: body.horoscope_sign,
    philosophy: body.philosophy,
    feelings: body.feelings,
    infor_url: body.infor_url,
});
