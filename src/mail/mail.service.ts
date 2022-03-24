'use strict';
import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  // async..await is not allowed in global scope, must use a wrapper
  async main(emailData) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '104c2a023d38b8', // generated ethereal user
        pass: 'da0a230968ced1', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.supject, // Subject line
      text: emailData.text, // plain text body
      html: emailData.htmlMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
