const express = require('express');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use('/api/users/', usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
