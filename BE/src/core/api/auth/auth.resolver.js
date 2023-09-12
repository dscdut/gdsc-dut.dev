import { Module } from 'packages/handler/Module';
import { SignInInterceptor } from 'core/modules/auth/interceptor/sign-in.interceptor';
import { AuthController } from './auth.controller';

export const AuthGoogleResolver = Module.builder()
    .addPrefix({
        prefixPath: '/authGoogle',
        tag: 'authGoogle',
        module: 'authModule',
    })
    .register([
        {
            route: '/signin',
            method: 'post',
            interceptors: [SignInInterceptor],
            body: 'SignInDto',
            controller: AuthController.signIn,
        }
    ]);
