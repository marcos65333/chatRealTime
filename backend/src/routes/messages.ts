import User from '../models/user';
import express from 'express';
import { Request, Response } from 'express';
import Message from '../models/message';


const router = express.Router();

// Endpoint para obtener mensajes paginados
router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const offset = (page - 1) * limit;

  const messages = await Message.findAll({
    order: [['createdAt', 'DESC']], // mensajes más nuevos primero
    offset,
    limit,
    include: [{ model: User, attributes: ['id', 'username', 'email'] }],
  });

  res.json(messages);
});

export default router;
