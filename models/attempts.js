var db = require('./database');

var ATTEMPTS_TABLE = 'attempts';

var setup = function() {
  db.client.schema.hasTable(ATTEMPTS_TABLE).then(function(exists) {
    if (!exists) {
      // First creation
      db.client.schema.createTable(ATTEMPTS_TABLE, function(table) {
        table.increments();
        table.string('email');
        table.json('metadata');
        table.json('error');
        table.timestamp('created_at').defaultTo(db.client.fn.now());
      }).catch(function(e) {
        db.error(ATTEMPTS_TABLE, 'setup', e);
      });
    }
  });
};

var log = function(params, callback) {
  db.client.insert(params)
    .into(ATTEMPTS_TABLE)
    .then(function(results) {
      db.result(null, results, callback);
    })
    .catch(function(e) {
      db.error(ATTEMPTS_TABLE, 'create', e);
      db.result(e, null, callback);
    });

};

module.exports = {
  setup: setup,
  log: log
};
