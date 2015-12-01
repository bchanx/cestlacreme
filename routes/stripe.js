var router = require('express').Router();
var config = require('../config');
var validate = require('email-validator');
// TODO: prod/test key
var stripe = require('stripe')(config.get('STRIPE_TEST_SECRET_KEY'));

var PRODUCT = {
  types: ['vanilla', 'matcha', 'earlgrey'],
  minimum: 4,
  maximum: 12,
  price: 500 // cents
};

var ORDER_NUMBER = {
  keys: 'abcdefghijklmnopqrstuvwxyz1234567890',
  length: 6
};

var generateOrderNumber = function() {
  var order = [];
  for (var i = 0; i < ORDER_NUMBER.length; i++) {
    order.push(ORDER_NUMBER.keys[Math.floor(Math.random() * ORDER_NUMBER.keys.length)]);
  }
  return order.join('').toUpperCase();
};

var getQuantity = function(selection) {
  if (!(selection && Object.keys(selection).length)) {
    return 0;
  }
  return Math.ceil(Object.keys(selection).map(function(type) {
    return parseInt(selection[type].value) || 0;
  }).reduce(function(a, b) {
    return a + b;
  }));
};

var getDescription = function(order, selection) {
  var options = [];
  Object.keys(selection).forEach(function(type) {
    if (selection[type].value) {
      options.push(selection[type].name + ' x ' + selection[type].value);
    }
  });
  return '[Order# ' + order + '] A tasty batch of Creme Brulee! (' + options.join(', ') + ')';
};

var validateSelection = function(selection) {
  // Make sure selection is there
  if (!(selection && Object.keys(selection).length)) {
    return {
      type: 'selection',
      message: 'Order selection is missing.'
    };
  }
  var types = Object.keys(selection);
  for (var i = 0, type; type = types[i++];) {
    if (PRODUCT.types.indexOf(type) < 0) {
      // Unrecognized product
      return {
        type: 'selection',
        message: 'Unrecognized product selected. (' + type + ')'
      };
    }
  }
  var quantity = getQuantity(selection);
  if (quantity < PRODUCT.minimum || quantity > PRODUCT.maximum) {
    // Order quantity out of range
    return {
      type: 'selection',
      message: 'Quantity is invalid. (' + quantity + ')'
    };
  }
  // All good!
  return null;
};

// Stripe call to CHARGE
router.post('/order', function(req, res) {
  var email = req.body.email;
  if (!validate.validate(email)) {
    // Email is invalid
    return res.send({
      success: false,
      error: {
        type: 'email',
        message: 'Email is invalid.'
      }
    });
  }
  else {
    var selection = req.body.selection;
    var error = validateSelection(selection);
    if (error) {
      // Selection is invalid
      return res.send({
        success: false,
        error: error
      });
    }
    else {
      // No more errors, let's make a charge!
      var quantity = getQuantity(selection);
      // TODO: make sure order number doesn't exist...
      var order = generateOrderNumber();
      var description = getDescription(order, selection);
      var stripeToken = req.body.stripeToken;
      var product = {};
      Object.keys(selection).forEach(type => {
        product[type] = selection[type].value;
      });
      var charge = stripe.charges.create({
        amount: quantity * PRODUCT.price, // amount in cents
        currency: 'cad',
        source: stripeToken,
        description: description,
        receipt_email: email,
        metadata: {
          order: order,
          email: email,
          product: JSON.stringify(product)
        }
      }, function(err, charge) {
        var livemode = req.body.livemode;
        if (err) {
          // Charge failed.
          // TODO: Log the request.
          return res.send({
            success: false,
            error: err
          })
        }
        else {
          // Charge succeeded!
          // TODO: Log and save to DB (email, order#, time, order amount, product)...
          return res.send({
            success: true,
            order: order,
            charge: charge
          })
        }
      });
    }
  }
});

module.exports = {
  router: router
};
