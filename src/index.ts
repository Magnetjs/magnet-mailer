import { Module } from 'magnet-core/module'
import * as nodemailer from 'nodemailer'

import defaultConfig from './config/mailer'

export default class Mailer extends Module {
  async setup () {
    const config = this.prepareConfig('mailer', defaultConfig)

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
