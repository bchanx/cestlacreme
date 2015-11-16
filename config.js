var fs = require('fs');

var ENV_FILE = './.env';
var PROPERTIES = {};

try {
  var env = fs.readFileSync(ENV_FILE).toString();
  env = env.split('\n');
  env.forEach(function(line) {
    if (!!~line.indexOf('=')) {
      var keyValue = line.split('=');
      PROPERTIES[keyValue[0]] = keyValue[1];
    }
  });
}
catch (e) {
  // No .env file on server, continue
}

var get = function(key) {
  return process.env[key] || PROPERTIES[key];
};

module.exports = {
  get: get
};
