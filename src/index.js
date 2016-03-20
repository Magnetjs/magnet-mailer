import { EmailTemplate } from 'email-templates';
import Base from 'magnet-core/dist/base';
import nodemailer from 'nodemailer';
import path from 'path';
import defaultConfig from './config/mailer';

export default class Mailer extends Base {
  async setup() {
    let config = Object.assign(defaultConfig, this.config.mailer);

    this.templatesPath = path.resolve(
      process.cwd(),
      config.templatePath || 'server/emails'
    );

    // create reusable transporter method (opens pool of SMTP connections)
    if (config.type === 'smtp') {
      this.transporter = nodemailer.createTransport(
        config.options
      );
    } else if (config.type === 'custom') {
      this.transporter = nodemailer.createTransport(
        config.customTransport
      );
    }

    for (let pluginKey of Object.keys(config.plugins)) {
      this.transporter.use(pluginKey, config.plugins[pluginKey]);
    }

    this.app.mailer = {
      sendMail: this.transporter.sendMail,
      sendWithTemplate: this.sendWithTemplate.bind(this)
    };
  }

  async tearDown() {
    // if you don't want to use this transporter object anymore
    this.transporter.close(); // shut down the connection pool, no more messages
  }

  /**
    this.mailer.send(
      'welcome',
      {
        from: 'Kieve Chua ✔ <kievechua@example.com>', // sender address
        to: 'bruce@example.com', // list of receivers
        subject: 'Hello ✔' // Subject line
      },
      {
        user: 'Kieve Chua'
      }
    );
  */
  async sendWithTemplate(templateName, mailOptions, locals = {}) {
    // Do I need to cache this?
    let send = this.transporter.templateSender(
      new EmailTemplate(`${this.templatesPath}/${templateName}`)
    );

    return await send(mailOptions, locals);
    // let { html, text } = await template.render(locals);
    //
    // mailOptions.text = text; // plain text body
    // mailOptions.html = html; // html body
    //
    // // send mail with defined transporter object
    // return await this.transporter.sendMail(mailOptions);
  }
}
