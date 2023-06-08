import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const CreateEventInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        name: JoiUtils.requiredString(),
        description: JoiUtils.requiredString(),
        image_id: JoiUtils.positiveNumber(),
        sponsor_ids: JoiUtils.requiredArrayNumber(),
        gen_id: JoiUtils.positiveNumber(),
    }),
);
