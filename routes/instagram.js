var router = require('express').Router();
var config = require('../config');
var request = require('request');

var TYPES = {
  IMAGE: 'image',
  VIDEO: 'video'
};

var instagram = function(route) {
  return 'https://api.instagram.com' + route;
};

// Use to get access token
router.get('/auth', function(req, res) {
  res.redirect(instagram('/oauth/authorize?client_id=' + config.get('INSTAGRAM_CLIENT_ID') + '&redirect_uri=' + config.get('HOSTNAME') + '/instagram/auth_cb&response_type=token'));
});

// Instagram auth callback here
router.get('/auth_cb', function(req, res) {
  res.sendStatus(200);
});

var RECENT = [];
router.get('/recent', function(req, res) {
  if (RECENT.length) {
    res.send(RECENT);
  }
  else {
    var options = {
      access_token: config.get('INSTAGRAM_ACCESS_TOKEN'),
      count: 6
    };
    request({
      method: 'GET',
      json: true,
      url: instagram('/v1/users/self/media/recent/'),
      qs: options
    }, function(error, response, body) {
      if (body && body.data) {
        body.data.forEach(function(d) {
          if (d.type === TYPES.IMAGE) {
            RECENT.push({
              timestamp: d.created_time,
              description: d.caption ? d.caption.text : null,
              source: d.link,
              url: d.images.standard_resolution.url
            });
          }
        });
      }
      res.send(RECENT);
    });
  }
});

module.exports = {
  router: router
};
