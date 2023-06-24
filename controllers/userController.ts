import {userModel} from "../models/userModel";


const getUserByEmailIdAndPassword = (email: string, password: string) => {
  
  try{
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return [user,""];
      } else {
        // assignment requirement: return incorrect password
        return [null,"Incorrect password."];
      }
    }
    return [null,""];
  } catch (error:any) {
    // assignment requirement: return incorrect email
    return [null, error.message];
  }
};
const getUserById = (id:any) => {
  
  try {
    let user = userModel.findById(id,null);
    if (user) {
      return user;
    }
    return null;
  } catch (error:any){
    console.log(error.message);
    //log error
  }

};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
