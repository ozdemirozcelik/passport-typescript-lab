import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';




const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        // 3 keys to github database, need to register oauth app on github
        clientID: "764df98634360af00049",
        clientSecret: "161a3e967a4804d16263c0de47b2d6786bedfea4",
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
