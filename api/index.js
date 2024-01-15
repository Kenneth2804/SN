
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const express = require('express');
const session = require('express-session');
const app = express();
app.use(session({
  secret: process.env.LOGINKEY, // Replace with your actual secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use 'true' if you are using HTTPS
}));
// Syncing all the models at once.
conn.sync({ force: false }).then( () => {
  server.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});