import { getUserById} from "../../controllers/userController";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';

// Get github secrets
import { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } from '../../config/secrets';
import { userModel } from "../../models/userModel";
// TODO: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// require('dotenv').config();
// console.log(process.env)


const githubStrategy: GitHubStrategy = new GitHubStrategy(

    {
        clientID: CLIENT_ID as string,
        clientSecret: CLIENT_SECRET as string,
        callbackURL: CALLBACK_URL as string,
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    // this should be filled in with all the information from github callback
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        // console.log("*** GITHUB PROFILE ***");
        // console.log(profile);
        let user = getUserById(Number(profile.id));
        if (user) {
            done(null, user);
          } else {
            // create new user
            userModel.addOne(Number(profile.id),profile.displayName,"","");
            done(null, user);
          }

    },
);


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
