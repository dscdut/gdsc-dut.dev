import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const SignInInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        tokenId: JoiUtils.requiredString(),
    }),
);
