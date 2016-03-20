Magnet wrapper for [Nodemailer](https://github.com/andris9/Nodemailer)

```
import mandrillTransport from 'nodemailer-mandrill-transport';

module.exports.mailer = {
  module: 'koala-mailer',

  // Load by plugin
  type: 'plugin',
  plugin: mandrillTransport({
    auth: {
      apiKey: ''
    }
  })

  // Load by SMTP or DKIM
  type: 'SMTP',
  service: 'Gmail',
  auth: {
    user: '',
    pass: ''
  }
};
```

### TODO
Look into [Mailman](https://github.com/vdemedes/mailman) maybe?
