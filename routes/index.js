var router = require('express').Router();

router.get('/splash', function(req, res, next) {
  res.render('splash');
});

module.exports = {
  router: router
};
