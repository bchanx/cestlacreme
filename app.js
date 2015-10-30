var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 3000));
app.set('env', (process.env.ENV || 'development'));

app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(app.get('port'), function () {
  console.log('Server running on port:', app.get('port'));
});
