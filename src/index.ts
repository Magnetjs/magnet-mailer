import { Module } from 'magnet-core/module'
import * as nodemailer from 'nodemailer'

export default class Mailer extends Module {
  init () {
    this.moduleName = 'nodemailer'
    this.defaultConfig = __dirname
  }

  async setup () {
    // create reusable transporter method (opens pool of SMTP connections)
    this.insert(nodemailer.createTransport(this.config.transport))

    if (this.config.plugins) {
      for (let pluginKey of Object.keys(this.config.plugins)) {
        this.app.nodemailer.use(pluginKey, this.config.plugins[pluginKey])
      }
    }

    await this.app.nodemailer.verify()
  }
}
