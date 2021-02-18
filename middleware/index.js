const axios = require('axios');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const exec = require('child_process').exec;

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
        queueServers.push(server);
    } catch { 
        res.sendStatus(400); 
        emailModel.serverFailed(server);
    }
});

async function initServers() {
    await serverModel.clear();
    await serverModel.updateIP();
}

async function monitoring() {
    while(true) {
       var urls = await getServersUrls(); 
       await exec(`sh request_servers.sh${urls}`);    
       await serverModel.sleep(10);
    }
}

async function getServersUrls() {
    var result = "";
    var serversUrls = await serverModel.getAllServers();
    serversUrls.forEach(x => {
        result += ` ${x.ip}:${x.port}/`;
    });
    return result;
}

app.listen(port, async () => {
    console.log(`MIDDLEWARE IS RUNNING ON PORT ${port}`)
    await initServers()
    //monitoring();
});
