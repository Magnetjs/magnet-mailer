'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emailTemplates = require('email-templates');

var _base = require('magnet-core/dist/base');

var _base2 = _interopRequireDefault(_base);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mailer = require('./config/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mailer = function (_Base) {
  _inherits(Mailer, _Base);

  function Mailer() {
    _classCallCheck(this, Mailer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Mailer).apply(this, arguments));
  }

  _createClass(Mailer, [{
    key: 'setup',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pluginKey;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = Object.assign(_mailer2.default, this.config.mailer);


                this.templatesPath = _path2.default.resolve(process.cwd(), config.templatePath || 'server/emails');

                // create reusable transporter method (opens pool of SMTP connections)
                if (config.type === 'smtp') {
                  this.transporter = _nodemailer2.default.createTransport(config.options);
                } else if (config.type === 'custom') {
                  this.transporter = _nodemailer2.default.createTransport(config.customTransport);
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 6;
                for (_iterator = Object.keys(config.plugins)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  pluginKey = _step.value;

                  this.transporter.use(pluginKey, config.plugins[pluginKey]);
                }

                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 14:
                _context.prev = 14;
                _context.prev = 15;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 17:
                _context.prev = 17;

                if (!_didIteratorError) {
                  _context.next = 20;
                  break;
                }

                throw _iteratorError;

              case 20:
                return _context.finish(17);

              case 21:
                return _context.finish(14);

              case 22:
                this.app.mailer = {
                  sendMail: this.transporter.sendMail,
                  sendWithTemplate: this.sendWithTemplate.bind(this)
                };

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 10, 14, 22], [15,, 17, 21]]);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: 'tearDown',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // if you don't want to use this transporter object anymore
                this.transporter.close(); // shut down the connection pool, no more messages

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function tearDown() {
        return ref.apply(this, arguments);
      }

      return tearDown;
    }()

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

  }, {
    key: 'sendWithTemplate',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(templateName, mailOptions) {
        var locals = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var send;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Do I need to cache this?
                send = this.transporter.templateSender(new _emailTemplates.EmailTemplate(this.templatesPath + '/' + templateName));
                _context3.next = 3;
                return send(mailOptions, locals);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendWithTemplate(_x, _x2, _x3) {
        return ref.apply(this, arguments);
      }

      return sendWithTemplate;
    }()
  }]);

  return Mailer;
}(_base2.default);

exports.default = Mailer;