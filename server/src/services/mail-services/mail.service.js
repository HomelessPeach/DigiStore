const mailer = require('nodemailer');
const config = require('../../../config/config');
const {promises: fs} = require("fs");

const transport = mailer.createTransport({
    host: config.mailOptions.host,
    port: config.mailOptions.port,
    secure: true,
    auth: {
        user: config.mailOptions.login,
        pass: config.mailOptions.password
    }
})

class MailService {

    static async sendMail(addressee, subject, html) {
        try {
            await transport.sendMail({
                from: config.mailOptions.login,
                to: addressee,
                subject: subject,
                html: html,
            })
        } catch (err){
            console.log(err)
        }
    }

    static async getTemplate(token) {
        const templateHTML = await fs.readFile('src/public/attribute-files/reset_password');
        const template = templateHTML.toString();
        return template.replace('{RESET_PASSWORD}', `${config.application.domain}/reset_password/${token}`);
    }

}

module.exports = {MailService};
