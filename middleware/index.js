const axios = require('axios');
const express = require('express');
const cors = require('cors');

const db = require('./db/Connection');
const serverModel = require('./model/server')
const emailModel = require('./model/user');

db();

var app = express();
var port = process.env.PORT || 8000;

var queueServers = [];

app.use(cors());
app.use(express.json());

app.use('/email', emailModel.route);
app.use('/server', serverModel.route);

// image 
app.post('/image', async (req, res) => {
    var server = queueServers.shift();
    let response = await axios.post(`http://${server.ip}:${server.port}/`, req, {
        responseType: 'stream',
        headers: req.headers
    });
    response.data.pipe(res);
    response.data.on('end', () => res.end());
    queueServers.push(server);
});

// consultar todos los servidores
async function initServers() {
    var servers = await serverModel.getAllServers();
    servers.forEach(x => queueServers.push({ ip: x.ip, port: x.port }));
    console.log(queueServers);
}

app.listen(port, () => {
    console.log(`middleware running on port ${port}`);
    initServers();
});
