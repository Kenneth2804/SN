const socketIO = require('socket.io');

let io;
const users = {}; // Mapa para almacenar los userId y sus sockets

function initializeSocket(httpServer) {
  io = socketIO(httpServer, {
    cors: {
      origin: "*", // Permitir todas las conexiones o restringirlas según tu configuración
    },
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('register', (userId) => {
      users[userId] = socket.id;
      console.log(`Usuario ${userId} registrado con el socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of Object.entries(users)) {
        if (socketId === socket.id) {
          delete users[userId];
          console.log(`Usuario ${userId} desconectado`);
          break;
        }
      }
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

function sendNotification(userId, notification) {
  const socketId = users[userId];
  if (socketId) {
    io.to(socketId).emit('notification', notification);
    console.log(`Notificación enviada a usuario ${userId}:`, notification);
  } else {
    console.log(`El usuario ${userId} no está conectado`);
  }
}

module.exports = { initializeSocket, sendNotification };
