import { CLIENT_ID } from '../../../env/index';

const { OAuth2Client } = require('google-auth-library');

class OAuthServiceImp {
    client = new OAuth2Client(CLIENT_ID);

    /**
     * @param {String} token
     */
     verify = async token => {
         try {
             const ticket = await this.client.verifyIdToken({
                 idToken: token,
             });
             return ticket.getPayload();
         } catch (error) {
             console.error('Lỗi xác thực:', error);
             return null;
         }
     };
}

export const OAuthService = new OAuthServiceImp();
