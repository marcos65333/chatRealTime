# 💬 Real-Time Chat App con Socket.IO y React

Este es un proyecto de **chat en tiempo real** desarrollado con **React + TypeScript** en el frontend y **Node.js + Express + Socket.IO** en el backend. Permite a múltiples usuarios conectarse, enviar y eliminar mensajes instantáneamente, con soporte para emojis y paginación infinita.

---

## 🚀 Características principales

- ✅ Autenticación con JWT
- 💬 Mensajería en tiempo real vía WebSocket (Socket.IO)
- 😄 Soporte de emojis con selector visual
- ♻️ Eliminación de mensajes sincronizada en todas las vistas
- 🧠 Cargado infinito de mensajes antiguos (infinite scroll)
- 📦 Backend con Sequelize y base de datos relacional
- 🎨 Interfaz estilo WhatsApp con mensajes alineados según el autor

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React + TypeScript  
- TailwindCSS  
- Socket.IO Client  
- Emoji Picker React  

### Backend
- Node.js + Express  
- Socket.IO  
- Sequelize ORM  
- PostgreSQL o MySQL  
- JSON Web Tokens (JWT)

---

## 📷 Capturas de pantalla (opcional)

_Agrega aquí screenshots si los tienes, mostrando la interfaz o flujos del chat._

---

## 🔧 Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/chat-realtime.git
cd chat-realtime

2. Configura las variables de entorno
Crea un archivo .env tanto en el frontend como en el backend (según lo necesites) con al menos las siguientes variables:

env
Copiar
Editar
# .env del backend
JWT_SECRET=tu_clave_secreta
DB_NAME=nombre_basededatos
DB_USER=usuario
DB_PASSWORD=clave
DB_HOST=localhost

3. Instala dependencias y ejecuta el Backend
bash
Copiar
Editar
cd backend
npm install
npm run dev

4. Instala dependencias y ejecuta el Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev


✍️ Autor
Marcos Antonio Tovar Torres
Desarrollador FullStack especializado en React, TypeScript, Flask y FastAPI.
📍 Barranquilla, Colombia
📧 marcosantoniotovartorres@gmail.com

