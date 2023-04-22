import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const CreateMemberInterceptor = new DefaultValidatorInterceptor(
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
        department_id: JoiUtils.positiveNumber(),
        position_id: JoiUtils.positiveNumber(),
        gen_id: JoiUtils.positiveNumber(),
    }),
);
