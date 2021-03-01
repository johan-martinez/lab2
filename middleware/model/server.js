const express = require('express');
const Server = require('../db/server');
const route = express.Router();
const exec = require('child-process-async').exec;
const fs = require('fs')

var getAllServers = async () => await Server.find({}, { '_id': 0, '__v': 0 })

// crear instancia
route.post('/', async (req, res) => {
    try {
        console.log('DOING INSTANCE');
        res.json({})
        let name = req.body.server, ip = getNewIP()
        const { stdout } = await exec(`sh createInstance.sh ${name} ${ip}`)
        await addServer(ip, 5000)
        fs.writeFileSync('./server_max_ip.txt', ip)
        console.log('THE INSTANCE HAS BEEN CREATED');
    } catch { console.log('ERROR TO CREATED INSTANCE') }
});

// obtener servers -> monitoring
route.get('/', (req, res) => {
    let info = []
    let servers = fs.readFileSync(__dirname + '/../logs/latest.log', { encoding: 'utf-8' }).split('\n')
    servers.forEach(x => {
        if (x === '') return
        let data = x.split(' ')
        info.push({ ip: data[0].split(':')[0], port: 5000, status: data[1] === 'true' })
    })
    res.json(info)
});

// agregar nuevo server
async function addServer(ip, port) {
    global.queueServers.unshift({ ip: ip, port: port });
    let server = {};
    server.ip = ip;
    server.port = port;
    let serverModel = new Server(server);
    await serverModel.save();
    console.log(`ADD Server: IP: ${ip}, PORT: ${port}`)
    return server;
}

function getNewIP() {
    let actual_ip = fs.readFileSync('./server_max_ip.txt', { encoding: 'utf-8' }).split('.')
    actual_ip[actual_ip.length - 1] = parseInt(actual_ip[actual_ip.length - 1]) + 1
    return actual_ip.join('.')
}

module.exports = { route, getAllServers };