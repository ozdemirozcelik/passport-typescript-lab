import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';

// Get github secrets
import { CLIENT_ID, CLIENT_SECRET } from '../../config/secrets';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth.github/callbak",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    // this should be filled in with all the information from github callback
    // very similar to local strategy, take email username and save it to database
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {},
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
