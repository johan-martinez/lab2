const express = require('express');
const route = express.Router();

route.post('/', (req,res)=> {
    console.log(req.body);
    res.send('image changed!');
});

module.exports = route;