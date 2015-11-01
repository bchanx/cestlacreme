var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var compress = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3000;
app.set('env', ENV);
app.set('port', PORT);

app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.locals = {
  env: ENV,
  title: 'C\'est la Creme',
  min: ENV === 'production' ? '.min' : ''
};

app.get('/', function (req, res) {
  if (ENV === 'development') {
    res.render('index');
  }
  else {
    res.render('splash');
  }
});

var server = app.listen(PORT, function () {
  console.log('Server running as [%s] on port [%s]', ENV, PORT);
});
