import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const CreateSponsorInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        description: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
        image_id: JoiUtils.positiveNumber(),
        gen_id: JoiUtils.positiveNumber(),
    }),
);
