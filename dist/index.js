"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const nodemailer = require("nodemailer");
const mailer_1 = require("./config/mailer");
class Mailer extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('mailer', mailer_1.default);
            // create reusable transporter method (opens pool of SMTP connections)
            this.app.nodemailer = nodemailer.createTransport(config.transport);
            if (config.plugins) {
                for (let pluginKey of Object.keys(config.plugins)) {
                    this.app.nodemailer.use(pluginKey, config.plugins[pluginKey]);
                }
            }
            yield this.app.nodemailer.verify();
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=index.js.map