import { AuthService } from '../../modules/auth/service/auth.service';
import { ValidHttpResponse } from '../../../packages/handler/response/validHttp.response';
import { SignInDto } from '../../modules/auth/dto/sign-in.dto';

class Controller {
    constructor() {
        this.service = AuthService;
    }

    signIn = async req => {
        const data = await this.service.signIn(SignInDto(req.body).tokenId);
        return ValidHttpResponse.toOkResponse(data);
    }
}

export const AuthController = new Controller();
