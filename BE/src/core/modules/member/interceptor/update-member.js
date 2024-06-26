import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const UpdateMemberInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        image_id: JoiUtils.positiveNumber(),
        full_name: JoiUtils.requiredString(),
        birthday: JoiUtils.date(),
        phone: JoiUtils.phoneNumber(),
        email: JoiUtils.email(),
        horoscope_sign: JoiUtils.requiredString(),
        philosophy: JoiUtils.requiredString(),
        feelings: JoiUtils.requiredString(),
        infor_url: JoiUtils.requiredString(),
        gens: JoiUtils.requiredArrayObject(),
        gen_id: JoiUtils.positiveNumber(),
        departments_id: JoiUtils.positiveNumber(),
        positions_id: JoiUtils.positiveNumber(),
        product_id: JoiUtils.positiveNumber(),
    }),
);
