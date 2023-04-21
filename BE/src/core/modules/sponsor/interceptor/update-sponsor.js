import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const UpdateSponsorInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        image_url: JoiUtils.requiredString(),
        description: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
    }),
);
