import Base from 'magnet-core/base'
import nodemailer from 'nodemailer'
import defaultConfig from './config/mailer'

export default class Mailer extends Base {
  async setup () {
    let config = Object.assign(defaultConfig, this.config.mailer)

    // create reusable transporter method (opens pool of SMTP connections)
    this.app.nodemailer = nodemailer.createTransport(config.transport)

    if (config.plugins) {
      for (let pluginKey of Object.keys(config.plugins)) {
        this.app.nodemailer.use(pluginKey, config.plugins[pluginKey])
      }
    }

    await this.app.nodemailer.verify()
  }
}
