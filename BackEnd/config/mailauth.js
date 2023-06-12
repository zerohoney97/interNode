const dot = require("dotenv").config();
const nodeemailer = require("nodemailer");

const smtpTransport = nodeemailer.createTransport({
    service : "Gmail",
    auth : {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls : {
        rejectUnauthorized : false
    }
});

module.exports = smtpTransport;