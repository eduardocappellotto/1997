'use strict';

var config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);

exports.send = (data) => {

    const msg = {
        to: data.email,
        from: 'nodestore@cappellotto.com.br',
        subject: data.name + ' Seja bem vindo á NodeStore',
        text: 'Olá Seja bem vindo á nodestore',
        html: '<strong>Gaste muito dinheiro :)</strong>',
    }
    sgMail.send(msg);
}