const express = require('express');
const User = require('../db/user');
const route = express.Router();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'monolegaltest@gmail.com',
        pass: 'monolegal123'
    }
});


var mailOptions = {
    from: 'monolegaltest@gmail.com',
    to: '',
    subject: 'FALLO EN EL SERVIDOR!',
    text: ''
};

// save email
route.post('/', async (req, res) => {
    const { email } = req.body;
    if (! await exist(email)) {
        let user = {};
        user.email = email;
        let userModel = new User(user);
        await userModel.save();
        res.json(userModel);
    } else {
        res.sendStatus(400);
    }
});

route.get('/', async (req, res) =>{
    var result = await getAllEmails();
    res.json({emails: result});
});

async function exist(email) {
    var result = await (await User.find({ email: email })).length;
    return result > 0;
}


// get all emails
async function serverFailed(server_failed) {
    console.log('SERVER FAILED. SENDING EMAILS... ')
    let emails = await getAllEmails();
    if (emails.length > 0) {
        mailOptions.to = emails.join(', ');
        mailOptions.text = `Hola! se le informa que el servidor con ip ${server_failed.ip} lanzado en el puerto ${server_failed.port} no responde.`;
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('ERROR TO SEND EMAILS')
            else console.log('SUCCESS! EMAILS SEND')
        });
    }
}

async function getAllEmails() {
    let result = await (await User.find({})).map(x => x.email);
    return result;
}

module.exports = { route, serverFailed };