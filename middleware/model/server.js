const express = require('express');
const Server = require('../db/server');
const route = express.Router();
const exec = require('child_process').exec;
const fs = require('fs')


// crear instancia
route.post('/', (req, res) => {
    res.json({});
    let name = req.body.server;
    const ls = exec(`sh create_instance.sh ${name}`, { shell: true });
    ls.on('exit', async function (code) {
        console.log("INSTANCE CREATED...")
        await sleep(40);
        updateIP();
    });
});

// obtener servers
route.get('/', async (req,res)=>{
    fs.readFile(__dirname +'/../logs/latest.log', (err, data) => {
        if (err) res.sendStatus(400);
        else res.send(data.toString());
    });
});

// agregar nuevo server
async function addServer(ip, port) {
    global.queueServers.unshift({ ip: ip, port: port });
    let server = {};
    server.ip = ip;
    server.port = port;
    let serverModel = new Server(server);
    await serverModel.save();
    console.log(`ADD SERVICE: IP: ${ip}, PORT: ${port}`)
    return server;
}

async function noExist(_ip) {
    let result = await Server.find({ ip: _ip });
    return result.length == 0;
}

async function clear() {
    await Server.deleteMany({});
}

async function getAllServers() {
    let result = await Server.find({});
    return result;
}

async function updateIP() {
    var ipsCommand = await exec(`sh getIP.sh`);
    ipsCommand.stdout.on('data', (data) => {
        var ips = data.split('\n');
        ips.forEach(element => {
            exec(`ping -c 1 ${element}; echo $?`, async (error, stdout, stderr) => {
                var output = stdout.split('\n');
                var noExi = await noExist(element);
                if (output[output.length - 2] == 0 && noExi) {
                    addServer(element, 5000);
                }
            });
        });
    });
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duration * 1000)
    })
}

module.exports = { route, getAllServers, updateIP, sleep, updateIP, clear };