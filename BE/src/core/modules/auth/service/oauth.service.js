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
                 audience: CLIENT_ID,
             });
             return ticket.getPayload();
         } catch (error) {
             // Xử lý lỗi xác thực ở đây
             console.error('Lỗi xác thực:', error);
             return null; // Hoặc giá trị mặc định khác
         }
     };
}

export const OAuthService = new OAuthServiceImp();
