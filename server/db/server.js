const mongoose = require('mongoose');

const server = mongoose.Schema({
    ip: {
        type:String
    },
    port: {
        type: Number
    }
});

module.exports = Server = mongoose.model('server', server);