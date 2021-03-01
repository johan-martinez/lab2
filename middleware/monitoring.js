const exec = require('child-process-async').exec;
const serverModel = require('./model/server')

var sleep = (duration) => new Promise(resolve => { setTimeout(() => { resolve() }, duration * 1000) })

async function initServers() {
   let servers = await serverModel.getAllServers()
   global.queueServers = servers
}

async function monitoring() {
    await initServers()
    console.log(global.queueServers)
    while (true) {
        var urls = await getServersUrls();
        await exec(`sh request_servers.sh${urls}`);
        await sleep(10);
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

module.exports = monitoring