import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';

// Get github secrets
// import { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } from '../../config/secrets';
// Better: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require('dotenv').config();
// console.log(process.env)

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string,
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
