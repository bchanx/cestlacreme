var router = require('express').Router();
var config = require('../config');
var validate = require('email-validator');
var orders = require('../models/orders');
var attempts = require('../models/attempts');
var stripe = require('stripe')(config.get('STRIPE_SECRET_KEY'));

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

var generateOrderNumber = function(callback) {
  var orderNumber = [];
  for (var i = 0; i < ORDER_NUMBER.length; i++) {
    orderNumber.push(ORDER_NUMBER.keys[Math.floor(Math.random() * ORDER_NUMBER.keys.length)]);
  }
  orderNumber = orderNumber.join('').toUpperCase();
  orders.query({
    select: 'order_number',
    where: {
      order_number: orderNumber
    }
  }, function(results) {
    if (results.length) {
      generateOrderNumber(callback);
    }
    else {
      callback(orderNumber);
    }
  });
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

var getDescription = function(orderNumber, selection) {
  var options = [];
  Object.keys(selection).forEach(function(type) {
    if (selection[type].value) {
      options.push(selection[type].name + ' x ' + selection[type].value);
    }
  });
  return '[Order# ' + orderNumber + '] A tasty batch of Creme Brulee! (' + options.join(', ') + ')';
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

var handleError = function(res, email, metadata, error) {
  // Log the error attempt
  attempts.log({
    email: email,
    metadata: JSON.stringify(metadata),
    error: JSON.stringify(error)
  });
  return res.send({
    success: false,
    error: error
  });
};

// Stripe call to CHARGE
router.post('/order', function(req, res) {
  var email = req.body.email;
  if (!validate.validate(email)) {
    // Email is invalid
    return handleError(res, email, {}, {
      type: 'email',
      message: 'Email is invalid.'
    });
  }
  else {
    var selection = req.body.selection;
    var error = validateSelection(selection);
    if (error) {
      // Selection is invalid
      return handleError(res, email, {
        selection: selection
      }, error);
    }
    else {
      // No more errors, let's make a charge!
      generateOrderNumber(function(orderNumber) {
        var quantity = getQuantity(selection);
        var description = getDescription(orderNumber, selection);
        var stripeToken = req.body.stripeToken;
        var product = {};
        Object.keys(selection).forEach(type => {
          product[type] = selection[type].value;
        });
        // Create db object
        var obj = {
          order_number: orderNumber,
          email: email,
          amount: quantity * PRODUCT.price, // amount in cents
          product: JSON.stringify(product),
          comments: req.body.comments,
          livemode: req.body.livemode
        };
        var charge = stripe.charges.create({
          amount: obj.amount,
          currency: 'cad',
          source: stripeToken,
          description: description,
          receipt_email: obj.email,
          metadata: {
            order_number: obj.order_number,
            email: obj.email,
            product: obj.product,
            comments: obj.comments
          }
        }, function(err, charge) {
          if (err) {
            // Charge failed.
            return handleError(res, email, obj, err);
          }
          else {
            // Charge succeeded!
            orders.create(obj);
            return res.send({
              success: true,
              orderNumber: orderNumber,
              charge: charge
            })
          }
        });
      });
    }
  }
});

module.exports = {
  router: router
};
