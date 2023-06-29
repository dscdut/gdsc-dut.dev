import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateMemberDto', {
    full_name: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    horoscope_sign: SwaggerDocument.ApiProperty({ type: 'string' }),
    philosophy: SwaggerDocument.ApiProperty({ type: 'string' }),
    feelings: SwaggerDocument.ApiProperty({ type: 'string' }),
    infor_url: SwaggerDocument.ApiProperty({ type: 'string' }),
    image_id: SwaggerDocument.ApiProperty({ type: 'int' }),
    gens: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'object',
        properties: {
            gen_id: SwaggerDocument.ApiProperty({ type: 'string' }),
            department_id: SwaggerDocument.ApiProperty({ type: 'int' }),
            position_id: SwaggerDocument.ApiProperty({ type: 'int' }),
        }
    })
});

export const UpdateMemberDto = body => ({
    fullName: body.full_name,
    birthday: body.birthday,
    phone: body.phone,
    email: body.email,
    horoscopeSign: body.horoscope_sign,
    philosophy: body.philosophy,
    feelings: body.feelings,
    inforUrl: body.infor_url,
    imageId: body.image_id,
    gens: body.gens,
});
