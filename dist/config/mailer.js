'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import mandrillTransport from 'nodemailer-mandrill-transport';

exports.default = {
  plugins: {},
  templatePath: 'server/emails'

  // // By SMTP
  // // https://github.com/nodemailer/nodemailer#set-up-smtp
  // type: 'smtp',
  // options: {
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true, // use SSL
  //   auth: {
  //     user: 'user@gmail.com',
  //     pass: 'pass'
  //   }
  // },
  //
  // // // By plugin
  // // type: 'transport',
  // // plugin: mandrillTransport({
  // //   auth: {
  // //     apiKey: 'someid'
  // //   }
  // // }),
  //
  // plugins: {
  //   compile: 'markdown(options)',
  //   stream: 'signer(options)'
  // }
};