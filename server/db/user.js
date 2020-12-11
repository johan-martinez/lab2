const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: {
        type:String
    }
});

module.exports = User = mongoose.model('user', user);