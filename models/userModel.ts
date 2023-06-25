import Express from '../types';
const fs = require('fs');

// to load sample database synchronously
// import { readFileSync } from 'fs';
// const databaseDir = './models/database.json'
// const database = JSON.parse(readFileSync(databaseDir, 'utf8'));

// load sample database asynchronously
import { readFile } from 'fs/promises';

const databaseDir = './models/database.json'
let database: any[]  = [];

async function readDB(): Promise<void> {
  try {
    const jsonData: string = await readFile(databaseDir, 'utf-8');
    database = JSON.parse(jsonData);
    // console.log(database);
  } catch (error) {
    throw new Error('Error reading database');
  }
}

// Call the async function
readDB();


const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user: Express.User) => user.email === email);
    if (user) {
      return user;
    }
    // assignment requirement: return incorrect email
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number, done: any) => {
    const user = database.find((user: Express.User) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  addOne: (id: number, name: string, email: string, password: string) => {
    const user = database.find((user: Express.User) => user.id === id);
    if (user) {
      throw new Error(`User with id: ${id} already exists`);
    }
    const role = "user";
    const newUser = { id, role, name, email, password };
    database.push(newUser);
    const jsonData = JSON.stringify(database);

    // Write the JSON data to a file
    fs.writeFile('models/database.json', jsonData, 'utf8', (err:any) => {
      if (err) {
        console.error(err);
        return;
      }
      // log
      console.log('New contact added to database');
    });




    return newUser;
  }



};

export { database, userModel };
