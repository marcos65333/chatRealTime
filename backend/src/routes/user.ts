import User from '../models/user';
import express from 'express';
import { hashPassword } from '../utils/hash'; // Importa la función de hash
import validateRequired from '../middlewares/validateRequired';

const router = express.Router();

router.post('/', validateRequired(['email','password','username']), async (req, res) => {
  const { username, email, password } = req.body;
  try {
    
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    
    if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get user info
router.get('/', async (req, res) => {
  const userId = (req as any).user?.userId; // Obtiene el ID del usuario desde el token JWT
  console.log('User ID from request:', userId);
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email'] // Selecciona los campos que deseas retornar
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
