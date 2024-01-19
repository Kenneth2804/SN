
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const express = require('express');
const session = require('express-session');
const app = express();
app.use(session({
  secret: process.env.LOGINKEY, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

conn.sync({ force: false }).then( () => {
  server.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001'); 
  });
});