const express = require('express');
const Server = require('../db/server');
const User = require('../db/user');
const route = express.Router();
const email = require('./email');

// agregar
route.post('/', async (req, res) => {
    const { ip, port } = req.body;
    let server = {};
    server.ip = ip;
    server.port = port;
    let serverModel = new Server(server);
    await serverModel.save();
    res.json(serverModel);
});

// obtener todos
route.get('/', async (req, res) => {
    var servers = [];
    let result = await Server.find({});
    result.forEach(x => servers.push({ ip: x.ip, port: x.port }));
    res.json(servers);
});

// falla servidor 
route.post('/failed', async (req, res) => {
    let result =  await User.find({});          // busca todos los correos registrados
    var emails = result.map(x => x.email)  
    if (result.length != 0) email.sendEmails(emails, req.body);
    res.send();
});

module.exports = route;