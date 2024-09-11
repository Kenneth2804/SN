const server = require('./src/app.js'); // Mantener tu configuración de rutas y middlewares en 'app.js'
const { conn } = require('./src/db.js');
const http = require('http');
const { initializeSocket } = require('./src/controllers/Socket.js'); // Importar la función para inicializar Socket.IO

// Crear el servidor HTTP manualmente para integrarlo con Socket.IO
const httpServer = http.createServer(server);

// Inicializar Socket.IO
initializeSocket(httpServer);

// Sincronizar la base de datos y luego iniciar el servidor
conn.sync({ force: false }).then(() => {
  httpServer.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001'); 
  });
});
