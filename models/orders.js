var db = require('./database');
var async = require('async');

var ORDERS_TABLE = 'orders';

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
        // Run migrations
        // migrations();
      }).catch(function(e) {
        db.error(ORDERS_TABLE, 'setup', e);
      });
    }
    else {
      // Run migrations
      // migrations();
    }
  });
};

/*
var migrations = function() {
  async.series([
      function(seriesCallback) {
        db.client.schema.hasColumn(ORDERS_TABLE, 'success')
          .then(function(exists) {
            if (!exists) {
              console.log('[ POSTGRES ] Running "success" column migration.');
              db.client.schema.table(ORDERS_TABLE, function(table) {
                table.boolean('success').defaultTo(false);
                seriesCallback();
              }).catch(function(e) {
                db.error(ORDERS_TABLE, 'migrations', e);
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
      db.error(ORDERS_TABLE, 'migrations', err);
    }
  });
};
*/

var query = function(query, callback) {
  db.client.select(query.select)
    .from(ORDERS_TABLE)
    .where(query.where)
    .then(function(results) {
      db.result(null, results, callback);
    })
    .catch(function(e) {
      db.error(ORDERS_TABLE, 'query', e);
      db.result(e, null, callback);
    });
};

var create = function(params, callback) {
  db.client.insert(params)
    .into(ORDERS_TABLE)
    .then(function(results) {
      db.result(null, results, callback);
    })
    .catch(function(e) {
      db.error(ORDERS_TABLE, 'create', e);
      db.result(e, null, callback);
    });

};

var update = function(query, callback) {
  db.client(ORDERS_TABLE)
    .update(query.params)
    .where(query.where)
    .then(function(results) {
      db.result(null, results, callback);
    })
    .catch(function(e) {
      db.error(ORDERS_TABLE, 'update', e);
      db.result(e, null, callback);
    });
};

module.exports = {
  setup: setup,
  query: query,
  create: create,
  update: update
};
