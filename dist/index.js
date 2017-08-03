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
class Mailer extends module_1.Module {
    init() {
        this.moduleName = 'nodemailer';
        this.defaultConfig = __dirname;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter method (opens pool of SMTP connections)
            this.insert(nodemailer.createTransport(this.config.transport));
            if (this.config.plugins) {
                for (let pluginKey of Object.keys(this.config.plugins)) {
                    this.app.nodemailer.use(pluginKey, this.config.plugins[pluginKey]);
                }
            }
            yield this.app.nodemailer.verify();
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=index.js.map