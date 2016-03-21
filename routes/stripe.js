var router = require('express').Router();
var config = require('../config');
var validate = require('email-validator');
var orders = require('../models/orders');
var attempts = require('../models/attempts');
var coupons = require('../models/coupons');
var stripe = require('stripe')(config.get('STRIPE_SECRET_KEY'));

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
  if (true) {
    return {
      success: false,
      error: 'We are no longer accepting online payments at this time. Thank you for your interest.'
    };
  }

  var email = req.body.email;
  if (!validate.validate(email)) {
    // Email is invalid
    return handleError(res, email, {}, {
      type: 'email',
      message: 'Email is invalid.'
    });
  }

  var selection = req.body.selection;
  var error = orders.validate(selection);
  if (error) {
    // Selection is invalid
    return handleError(res, email, {
      selection: selection
    }, error);
  }

  var couponCode = (req.body.coupon || '').toUpperCase();
  coupons.apply(couponCode, selection, function(error, amount) {
    if (error) {
      // Coupon code is invalid
      return handleError(res, email, {
        coupon: couponCode
      }, error);
    }

    orders.getOrderNumber(function(error, orderNumber) {
      if (error) {
        // Order number creation failed
        return handleError(res, email, {}, error)
      }

      var description = orders.getDescription(orderNumber, selection);
      var stripeToken = req.body.stripeToken;
      var product = {};
      Object.keys(selection).forEach(type => {
        product[type] = selection[type].value;
      });
      // Create db object
      var obj = {
        order_number: orderNumber,
        email: email,
        amount: amount, // in cents
        product: JSON.stringify(product),
        coupon: couponCode,
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
          coupon: obj.coupon,
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
            coupon: couponCode,
            charge: charge
          })
        }
      });
    });
  });
});

module.exports = {
  router: router
};
