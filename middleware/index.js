const axios = require('axios');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./db/Connection');
const serverModel = require('./model/server')
const emailModel = require('./model/user');
const monitoring = require('./monitoring')

var app = express();
var port = process.env.PORT || 8000;

db();

global.queueServers = [];

app.use(express.json());
app.use(cors());

app.use(morgan(':date :method :url :status :response-time ms'));
app.use('/email', emailModel.route);
app.use('/server', serverModel.route);

// image 
app.post('/image', async (req, res) => {
    await sendImage(req, res)
});

async function sendImage(req, res) {
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
        //if(queueServers.length) sendImage(req, res)
        res.sendStatus(400);
        emailModel.serverFailed(server);
    }
}

app.listen(port, async () => {
    console.log(`MIDDLEWARE IS RUNNING ON PORT ${port}`)
   // monitoring()
});
