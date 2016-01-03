var router = require('express').Router();
var config = require('../config');
var validate = require('email-validator');
var nodemailer = require('nodemailer');

router.get('/splash', function(req, res) {
  res.render('splash');
});

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.get('GOOGLE_MAIL_USER'),
    pass: config.get('GOOGLE_MAIL_PASS')
  }
});

router.get('/email', function(req, res) {
  var from = 'C\'est la Creme <' + config.get('GOOGLE_MAIL_USER') + '>';
  var to = encodeURIComponent('Brian <bchanx@gmail.com>') + ' <' + 'bchanx@gmail.com' + '>';
  var mailOptions = {
    from: from,
    to: to,
//    bcc: from,
    subject: 'Hello there',
    text: 'hello world\nwhat the\n\n ok!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    return res.send({
      success: !error,
      error: error,
      info: info
    });
  });
});

module.exports = {
  router: router
};
