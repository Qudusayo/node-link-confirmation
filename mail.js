const nodemailer = require('nodemailer');

const user = require('./user')

const mail = (email, message) => {
    console.log('Mailing...............');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user.mail,
            pass: user.auth
        }
    });

    var mailOptions = {
        from: user.mail,
        to: email,
        subject: 'EMAIL CONFIRMATION',
        text: `Your Confirmation Link is ${message}, Visit  Now to verify your Email`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = mail;