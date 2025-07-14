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
<img width="1915" height="955" alt="Captura desde 2025-07-14 16-42-01" src="https://github.com/user-attachments/assets/ca3ece68-d63e-444a-bb1b-029a05f2bc2c" />
<img width="1858" height="937" alt="image" src="https://github.com/user-attachments/assets/053b1aa0-7156-4d4c-b335-e1a4e8a6adad" />

---

## 🔧 Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/chat-realtime.git
cd chatRealTime

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

