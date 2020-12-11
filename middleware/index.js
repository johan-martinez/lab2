const axios = require('axios');
const express = require('express');
const cors = require('cors');


var app = express();
var port = process.env.PORT || 8000;

var queueServers = [];
var url_server = "http://localhost:3000/server"; 

app.use(cors());
app.use(express.json());


// add server
app.post('/server', (req, res) => {
    // no se k hacer
    
});

// image 
app.post('/image', async (req, res) => {
    var server = getNextServer();
    console.log("IMAGE - POST"+server.ip + server.port)
    await axios.post(`http://${server.ip}:${server.port}/image`, req.body)
        .then((response) => res.send(response.data))
        .catch((error) => {
            serverFailed(server);
            res.send(error);
        });
    
});

// email. decirle al server que guarde ese email
app.post('/email', async (req, res) => {
    var server = getNextServer();
    await axios.post(`http://${server.ip}:${server.port}/email`, req.body)
        .then((response) => res.send(response.data))
        .catch((error) => {
            serverFailed(server);
            res.send(error);
        });
});


// servidor falla - activar servicio enviar email.
async function serverFailed(server_failed) {
    var server = getNextServer();
    await axios.post(`http://${server.ip}:${server.port}/server/failed`, { 
            ip : server_failed.ip, 
            port: server_failed.port
        });
}

function getNextServer() {
    var server = queueServers.shift();
    console.log(queueServers);
    queueServers.push(server);
    console.log(queueServers);
    return server;
}

// consultar todos los servidores
async function initServers() {
    let response = await axios.get(url_server);
    queueServers = response.data;
    console.log(queueServers);
}

app.listen(port, () => {
    console.log(`middleware running on port ${port}`);
    initServers();
});
