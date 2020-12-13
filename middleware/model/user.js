const express = require('express');
const User = require('../db/user');
const route = express.Router();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'monolegaltest@gmail.com',
        pass: 'monolegal123'
    }
});

var mailOptions = {
    from: 'monolegaltest@gmail.com',
    to: '',
    subject: 'SERVER FAILED!',
    text: ''
};

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
async function serverFailed(server_failed) {
    let result = await User.find({});
    if (result.length != 0) {
        let emails = result.map(x => x.email);
        mailOptions.to = emails.join(', ');
        mailOptions.text = `Hola! se le informa que el servidor con ip ${server_failed.ip} lanzado en el puerto ${server_failed.port} no responde.`;
        await transporter.sendMail(mailOptions, (error, info) => {  });
    }
}

module.exports = { route, serverFailed };