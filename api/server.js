const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('../endPoints/actions/actions-router');
const projectsRouter = require('../endPoints/projects/projects-router');

const server = express();

server.get('/', (req, res) => {
    res.send(`
    <h2>Sprint API</h2>
    <p>Welcome to my sprint</p>
    `);
});

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl}`);
    next();
};

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;