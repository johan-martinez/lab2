const express = require('express');
const cors = require('cors');
const db = require('./db/Connection');

var app = express();
var port = 3000;

db();

app.use(cors());
app.use(express.json());

app.use('/email', require('./services/user'));
app.use('/server', require('./services/server'));
app.use('/image', require('./services/image'));

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});