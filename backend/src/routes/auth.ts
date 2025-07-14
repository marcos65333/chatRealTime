import express from 'express';
import User from '../models/user';
import validateRequired from '../middlewares/validateRequired';
import { hashPassword, comparePasswords } from '../utils/hash'; 
import jwt from 'jsonwebtoken';

const router = express.Router(); 
router.post('/login', validateRequired(['email', 'password']), async (req, res) => {
  const { email, password } = req.body;
  try {
    
    // verify if user exists
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password','username'] // Include username in the response
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign({ userId: user.id,username:user.username }, secret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ msg: 'JWT is valid', user: decoded });
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
