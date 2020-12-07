
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const exec = require('child_process').exec;


const pathFile = 'logs/latest.log';
const restart_server_file = 'restart_server.sh';
const serversUrls = [{ ip: "192.168.1.72", port: 3000 }, { ip: "192.168.1.73", port: 3000 }];


var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// read file and send response
app.get('/', async (req, res) => {
    fs.readFile(pathFile, (err, data) => {
        if (err) res.sendStatus(400);
        else res.send(data.toString());
    });
});

app.post('/', async (req, res) => {
    var id = req.body.id;
    var ip = serversUrls[id].ip;
    exec(`ssh root@${ip} 'bash -s' < ${restart_server_file}`, (error, stdout, stderr) => {
        if (error) res.json({ request: "error" });
        else res.json({ request: "success" });
    });
});

function requestServers() {
    exec(`sh request_servers.sh ${getServersUrls()}`);
}

function getServersUrls() {
    var result = "";
    serversUrls.forEach(x => {
        result += `${x.ip}:${x.port}/ `;
    });
    return result;
}
app.listen(port, () => {
    console.log(`middleware running on port ${port}`);
    requestServers();
});