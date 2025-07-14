
const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password:string) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

const comparePasswords = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
}

export { hashPassword, comparePasswords };