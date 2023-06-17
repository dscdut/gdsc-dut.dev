import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const UpdateSponsorInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        description: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
        image_id: JoiUtils.positiveNumber(),
        gen_ids: JoiUtils.requiredArrayNumber(),
    }),
);
