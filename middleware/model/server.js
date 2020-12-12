const express = require('express');
const Server = require('../db/server');
const route = express.Router();

// agregar
async function addServer(ip, port) {
    let server = {};
    server.ip = ip;
    server.port = port;
    let serverModel = new Server(server);
    await serverModel.save();
    return server;
}

async function getAllServers() {
    let result = await Server.find({});
    return result;
}

// crear instancia
route.post('/', (req, res)=>{
    res.send('instancia creada');

//  crear instancia IP 
//  iniciarServidor sh PORT
//  
//  let s = addServer(ip, port);  db
//  queueSevers.push(s)  
});

module.exports = {route, getAllServers};