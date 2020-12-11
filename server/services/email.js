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

async function sendEmails(emails, info) {
    mailOptions.to = emails.join(', ');
    mailOptions.text = `Hola! se le informa que el servidor con ip ${info.ip} lanzado en el puerto ${info.port} no responde.`;
    await transporter.sendMail(mailOptions, function (error, info) {
        if(error) console.log(error);
        else console.log(info);
    });
}

module.exports = { sendEmails }
