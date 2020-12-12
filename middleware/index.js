const axios = require('axios');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');

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
app.post('/image', (req, res) => {
    var server = queueServers.shift();

   

    /*axios({
        method: 'post',
        url: `http://${server.ip}:${server.port}/`,
        data: req,
        responseType: 'stream'
      }) .then(function (response) {
        response.data.pipe(fs.createWriteStream('ada_lovelace.png'))
      });;*/
    

    axios.post(`http://${server.ip}:${server.port}/`, req, {
        headers: req.headers
    })
        .then(function (response) {
            response.data.
            response.data.on('open', function () {
                res.set('Content-Type', type);
                s.pipe(res);
            });
            response.data.on('close',function () {
                res.end()
                s.close()
                fs.unlinkSync(`images/transform/${p}`)
            })
        })
        .catch(function (error) {
            console.log(error);
        });

        /*fetch(`http://${server.ip}:${server.port}/`, {
            method: 'post',
            body: req.body,
            headers: req.headers
        })
        .then((response) => {
           console.log(response.blob()); 
        });*/

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
