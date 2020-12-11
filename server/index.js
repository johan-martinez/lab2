
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const exec = require('child_process').exec;


const pathFile = 'logs/latest.log';
const restart_server_file = 'restart_server.sh';
const serversUrls = [{ ip: "192.168.1.72", port: 3000 }, { ip: "192.168.1.73", port: 3000 }];


var app = express();
var port = process.env.PORT || 8000;



app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendStatus(200)
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});