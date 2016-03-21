Magnet wrapper for [Nodemailer](https://github.com/andris9/Nodemailer)

### Usage
Basic
```
import magnet from 'magnet-core';
import Config from 'magnet-config';
import Logger from 'magnet-bunyan';
import Mailer from 'magnet-mailer';

let app = await magnet([Config, Logger, Mailer]);

let response = await app.app.mailer.sendWithTemplate(
  'newsletter', {
    from: 'kievechua@hihibi.com',
    to: 'kievechua@gmail.com',
    subject: 'hello',
    text: 'hello world!'
  }, {
    email: 'mister.geppetto@spaghetti.com',
    name: {
      first: 'Mister',
      last: 'Geppetto'
    }
  }
);
```
server/config/mailer.js
```
import mandrillTransport from 'nodemailer-mandrill-transport';

export default {
  plugins: {
    compile: 'markdown(options)',
    stream: 'signer(options)'
  },
  
  // By SMTP
  // https://github.com/nodemailer/nodemailer#set-up-smtp
  type: 'smtp',
  options: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'user@gmail.com',
      pass: 'pass'
    }
  },

  // Custom transport
  type: 'custom',
  customTransport: mandrillTransport({
    auth: {
      apiKey: 'apiKey'
    }
  })
};
```

### TODO
Look into [Mailman](https://github.com/vdemedes/mailman) maybe?
