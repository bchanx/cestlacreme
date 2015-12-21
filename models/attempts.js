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
        db.log(ATTEMPTS_TABLE, 'setup', e);
      });
    }
  });
};

var log = function(params, callback) {
  db.client.insert(params)
    .into(ATTEMPTS_TABLE)
    .then(db.success(callback))
    .catch(db.error(ATTEMPTS_TABLE, 'create', callback));
};

module.exports = {
  setup: setup,
  log: log
};
