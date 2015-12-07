var knex = require('knex');
var config = require('../config');

var db = knex({
  client: 'pg',
  connection: config.get('DATABASE_URL') || 'postgres://localhost/cestlacreme',
  pool: {
    min: 0,
    max: 20
  }
});

var error = function(table, fn, error) {
  console.error('[POSTGRES] Something went wrong for table (' + table + ') from function (' + fn + '):', error);
};

var result = function(error, results, callback) {
  var r = {
    error: error,
    results: results || []
  };
  if (callback) {
    callback(r);
  }
  else {
    return (r);
  }
};

module.exports = {
  client: db,
  error: error,
  result: result
};
