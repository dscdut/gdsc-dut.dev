import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const UpdateProductInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        image_id: JoiUtils.positiveNumber(),
        description: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
    }),
);
