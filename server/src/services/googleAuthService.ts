import { OAuth2Client } from 'google-auth-library';

export class GoogleAuthService {
    private client: OAuth2Client;

    constructor(clientId: string) {
        this.client = new OAuth2Client(clientId);

    }

    public async getEmail(token: string): Promise<string> {
        console.log(token);
        const ticket: any = this.client.verifyIdToken({
          idToken: token,
          audience: '927647679318-36n4dvep88921pp6m9m7stmh092p8ufh.apps.googleusercontent.com',  // Replace with your client ID
        });
      
        return ticket.then(value => {
          console.log(value);
          return value.payload.email;
        });
    }
}
