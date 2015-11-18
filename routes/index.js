var router = require('express').Router();

if (process.env.NODE_ENV === 'production') {
  router.get('/', function(req, res) {
    res.render('splash');
  });
}

router.get('/splash', function(req, res) {
  res.render('splash');
});

module.exports = {
  router: router
};
