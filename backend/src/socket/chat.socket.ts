import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Message from '../models/message';

export default function configureSocket(io: Server) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Token faltante'))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }
      (socket as any).userId = decoded.userId
      next()
    } catch {
      return next(new Error('Token inválido'))
    }
  })

  io.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId
    if (!userId) return socket.disconnect()

    console.log(`✅ Usuario conectado: ${userId}`)

    // Enviar mensaje
    socket.on('chat message', async (msg: string) => {
      try {
        const message = await Message.create({ content: msg, userId })
        const fullMessage = await Message.findByPk(message.id, {
          include: [{ model: User, attributes: ['id', 'username', 'email'] }],
        })
        io.emit('chat message', fullMessage)
      } catch (err) {
        console.error('❌ Error al enviar mensaje:', err)
      }
    })

    // Eliminar mensaje
    socket.on('delete message', async (id: number) => {
      try {
        const message = await Message.findByPk(id)
        if (!message) return
        if (message.userId !== userId) return
        await message.destroy()
        io.emit('delete message', id)
      } catch (err) {
        console.error('❌ Error al eliminar mensaje:', err)
      }
    })

    socket.on('disconnect', () => {
      console.log(`🔌 Usuario ${userId} desconectado`)
    })
  })
}

