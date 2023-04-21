import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const CreateProductInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        image_id: JoiUtils.positiveNumber(),
        description: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
        member_ids: Joi.array().items(Joi.number().integer())
    }),
);
