const axios = require('axios');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./db/Connection');
const serverModel = require('./model/server')
const emailModel = require('./model/user');

db();

var app = express();
var port = process.env.PORT || 8000;

global.queueServers = [];

app.use(cors());
app.use(express.json());
app.use(morgan(':date :method :url :status :response-time ms'));

app.use('/email', emailModel.route);
app.use('/server', serverModel.route);

// image 
app.post('/image', async (req, res) => {
    var server = queueServers.shift();
    console.log(`SELECTED SERVER: ${server.ip}`);
    try {
        let response = await axios.post(`http://${server.ip}:${server.port}/`, req, {
            responseType: 'stream',
            headers: req.headers
        });
        response.data.pipe(res);
        response.data.on('end', () => res.end());
    } catch { 
        res.sendStatus(400); 
        emailModel.serverFailed(server);
    }
    queueServers.push(server);
});

// consultar todos los servidores
async function initServers() {
    var servers = await serverModel.getAllServers();
    servers.forEach(x=> queueServers.push({ ip: x.ip, port: x.port }));
    console.log('AVAILABLE SERVERS...');
    console.log(queueServers);
}

app.listen(port, () => {
    console.log(`MIDDLEWARE IS RUNNING ON PORT ${port}`);
    initServers();
});
