var db = require('./database');
var orders = require('./orders');

var COUPONS_TABLE = 'coupons';

var setup = function() {
  db.client.schema.hasTable(COUPONS_TABLE).then(function(exists) {
    if (!exists) {
      // First creation
      db.client.schema.createTable(COUPONS_TABLE, function(table) {
        table.increments();
        table.string('code').unique().notNullable().index();
        table.decimal('percent_off').defaultTo(0); // between 0 - 1
        table.integer('amount_off').defaultTo(0); // amount in cents
        table.integer('remaining_count').defaultTo(0);
        table.integer('used_count').defaultTo(0);
        table.timestamp('expires_at');
      }).catch(function(e) {
        db.error(COUPONS_TABLE, 'setup', e);
      });
    }
  });
};

var query = function(q, callback) {
  db.client.select(q.select)
    .from(COUPONS_TABLE)
    .where(q.where)
    .then(db.success(callback))
    .catch(db.error(COUPONS_TABLE, 'query', callback));
};

var update = function(q, callback) {
  db.client(COUPONS_TABLE)
    .update(q.params)
    .where(q.where)
    .then(db.success(callback))
    .catch(db.error(COUPONS_TABLE, 'update', callback));
};

var validate = function(couponCode, selection, callback) {
  if (!couponCode) {
    return callback(null);
  }
  query({
    select: '*',
    where: {
      code: couponCode
    }
  }, function(response) {
    if (response.error) {
      return callback(response.error); 
    }

    if (response.results.length) {
      var coupon = response.results[0];
      // Check coupon hasn't expired
      if (coupon.expires_at) {
        var now = new Date();
        if (now.getTime() >= coupon.expires_at.getTime()) {
          return callback({
            type: 'coupon',
            message: 'This coupon has expired.'
          });
        }
      }

      // Check coupon has remaining uses
      if (coupon.remaining_count <= 0) {
        return callback({
          type: 'coupon',
          message: 'This coupon has been fully redeemed.'
        });
      }

      // Check special limitations
      if (coupon.code === 'MERRYXMAS') {
        var quantity = orders.getQuantity(selection);
        if (quantity !== 4) {
          return callback({
            type: 'coupon',
            message: 'This coupon is only valid for ordering 4 creme brulee\'s.'
          });
        }
      }

      // No errors, valid coupon
      return callback(null);
    }
    else {
      return callback({
        type: 'coupon',
        message: 'Coupon code is invalid.'
      });
    }
  });
};

var apply = function(couponCode, selection, callback) {
  validate(couponCode, selection, function(error) {
    if (error) {
      return callback(error);
    }
    // Apply coupon
    query({
      select: '*',
      where: {
        code: couponCode
      }
    }, function(response) {
      if (response.error) {
        return callback(response.error);
      }

      var total = orders.getTotal(selection);
      var coupon = response.results[0];
      if (coupon) {
        update({
          params: {
            remaining_count: coupon.remaining_count - 1,
            used_count: coupon.used_count + 1
          },
          where: {
            code: couponCode
          }
        }, function(response) {
          if (response.error) {
            return callback(response.error);
          }
          // Apply amount modiifer
          total = Math.max(total - coupon.amount_off, 0);
          // Apply percent modifier
          total = total * Math.max(Math.min((1 - coupon.percent_off), 1), 0);
          // Make sure at least 50 cent charge (for Stripe)
          total = Math.max(total, 50);
          return callback(null, total);
        });
      }
      else {
        return callback(null, total);
      }
    });
  });
};

module.exports = {
  setup: setup,
  query: query,
  update: update,
  validate: validate,
  apply: apply
};
