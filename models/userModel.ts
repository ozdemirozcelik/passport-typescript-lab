import Express from '../types';

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
};

export { database, userModel };
