import express from 'express'; 
import userRoutes from './routes/user'; // Importa las rutas de usuario
import authRoutes from './routes/auth'; // Importa las rutas de autenticación
import jwt from './middlewares/jwt';
import messageRoutes from './routes/messages'; // Importa las rutas de mensajes

const router = express.Router(); 
router.use('/users',jwt, userRoutes);
router.use('/auth', authRoutes);
router.use('/messages', jwt, messageRoutes);
export default router;
