var db = require('./database');
var async = require('async');

var ORDERS_TABLE = 'orders';

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

var setup = function() {
  db.client.schema.hasTable(ORDERS_TABLE).then(function(exists) {
    if (!exists) {
      // First creation
      db.client.schema.createTable(ORDERS_TABLE, function(table) {
        table.increments();
        table.string('order_number').unique().notNullable().index();
        table.string('email').index();
        table.string('comments');
        table.decimal('amount');
        table.json('product');
        table.boolean('livemode').defaultTo(false);
        table.boolean('refunded').defaultTo(false);
        table.timestamp('created_at').defaultTo(db.client.fn.now());
        table.timestamp('updated_at').defaultTo(db.client.fn.now());
        table.string('coupon');
        // Run migrations
        // migrations();
      }).catch(function(e) {
        db.log(ORDERS_TABLE, 'setup', e);
      });
    }
    else {
      // Run migrations
      migrations();
    }
  });
};

var migrations = function() {
  async.series([
      function(seriesCallback) {
        db.client.schema.hasColumn(ORDERS_TABLE, 'coupon')
          .then(function(exists) {
            if (!exists) {
              console.log('[ POSTGRES ] Running "coupon" column migration.');
              db.client.schema.table(ORDERS_TABLE, function(table) {
                table.string('coupon');
                seriesCallback();
              }).catch(function(e) {
                db.log(ORDERS_TABLE, 'migrations', e);
              });
            }
            else {
              seriesCallback();
            }
          });
      }
  ], function(err, results) {
    // Done, log if errors
    if (err) {
      db.log(ORDERS_TABLE, 'migrations', err);
    }
  });
};

var query = function(q, callback) {
  db.client.select(q.select)
    .from(ORDERS_TABLE)
    .where(q.where)
    .then(db.success(callback))
    .catch(db.error(ORDERS_TABLE, 'query', callback));
};

var create = function(params, callback) {
  db.client.insert(params)
    .into(ORDERS_TABLE)
    .then(db.success(callback))
    .catch(db.error(ORDERS_TABLE, 'create', callback));
};

var update = function(q, callback) {
  db.client(ORDERS_TABLE)
    .update(q.params)
    .where(q.where)
    .then(db.success(callback))
    .catch(db.error(ORDERS_TABLE, 'update', callback));
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

var getTotal = function(selection) {
  var quantity = getQuantity(selection);
  return quantity * PRODUCT.price;
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

var getOrderNumber = function(callback) {
  var orderNumber = [];
  for (var i = 0; i < ORDER_NUMBER.length; i++) {
    orderNumber.push(ORDER_NUMBER.keys[Math.floor(Math.random() * ORDER_NUMBER.keys.length)]);
  }
  orderNumber = orderNumber.join('').toUpperCase();
  query({
    select: 'order_number',
    where: {
      order_number: orderNumber
    }
  }, function(response) {
    if (response.error) {
      return callback(response.error, null);
    }

    if (response.results.length) {
      // Order number already exists, generate another one
      getOrderNumber(callback);
    }
    else {
      callback(null, orderNumber);
    }
  });
};

var validate = function(selection) {
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

module.exports = {
  setup: setup,
  query: query,
  create: create,
  update: update,
  validate: validate,
  getQuantity: getQuantity,
  getTotal: getTotal, 
  getDescription: getDescription,
  getOrderNumber: getOrderNumber
};
