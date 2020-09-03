const express = require('express');
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger() {
  return function (req, res, next) {
    console.log(`${req.method} request to http://localhost:3333${req.url} on ${new Date()}`);
    next();
  }
}

module.exports = server;