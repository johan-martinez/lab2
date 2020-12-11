const express = require('express');
const User = require('../db/user');
const route = express.Router();

// save email
route.post('/', async (req, res) => {
    const { email } = req.body;
    let user = {};
    user.email = email;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});

// get all emails
route.get('/', async (req, res) => {
    let result = await User.find({});
    res.json(result.map(x => x.email));
});


module.exports = route;