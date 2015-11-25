var router = require('express').Router();
var config = require('../config');
// TODO prod/test key
var stripe = require('stripe')(config.get('STRIPE_TEST_SECRET_KEY'));

// Instagram auth callback here
router.post('/order', function(req, res) {
  console.log("-->> STRIPE ORDER! request.body:", req.body);
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 2000, // amount in cents
    currency: 'cad',
    source: stripeToken,
    description: 'An order of creme brulee!'
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      res.send({
        success: false
      })
    }
    else {
      // TODO Save to DB (email, order#, time, order amount, product)...
      res.send({
        success: true,
        charge: charge
      })
    }
  });
});

module.exports = {
  router: router
};
