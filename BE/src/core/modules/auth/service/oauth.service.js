import { CLIENT_ID } from '../../../env/index';

const { OAuth2Client } = require('google-auth-library');

class OAuthServiceImp {
    client = new OAuth2Client(CLIENT_ID);

    /**
     * @param {String} token
     */
    verify = async token => {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        return ticket.getPayload();
    }
}

export const OAuthService = new OAuthServiceImp();
