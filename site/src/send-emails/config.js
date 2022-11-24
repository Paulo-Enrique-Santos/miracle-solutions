const nodemailer = require('nodemailer');

const credentials = {
    user: 'miracle_solutions@outlook.com',
    pass: 'Miraclesolutions@123'
}

const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: credentials
});

function teste(email, code) {
    return transport.sendMail({
        from: credentials.user,
        to: email,
        subject: 'Redefinição de Senha',
        text: 'Informe esse código para redefinir a senha: ' + code
    });
}

module.exports = {
    teste
}