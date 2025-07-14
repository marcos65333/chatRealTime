import express, { Request, Response } from 'express';
import http from 'http';
import db from './config/database';
import mainRoutes from './main_routes'; 
import dotenv from 'dotenv';
import cors from 'cors'; 
import configureSocket from './socket/chat.socket'; // Importa la configuración del socket
import { Server } from 'socket.io'

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware CORS global
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api', mainRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Servidor de chat en tiempo real');
});

// 🔌 Lógica de socket separada
configureSocket(io);

// Inicializar DB
(async () => {
  await db.sync();
})();

export default server;
