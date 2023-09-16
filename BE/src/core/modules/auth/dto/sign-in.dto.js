import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('SignInDto', {
    tokenId: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const SignInDto = body => ({
    tokenId: body.tokenId,
});
