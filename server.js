'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react']
});

var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var fs = require('fs');
var compress = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*
if (process.env.NODE_ENV === 'production') {
  // Force SSL as default in Heroku
  var enforce = require('express-sslify');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}*/

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

// Setup global view variables
app.locals = {
  env: ENV,
  title: 'C\'est la Creme',
  min: ENV === 'production' ? '.min' : ''
};

// Initialize DB
var MODEL_DIR = './models';
var models = fs.readdirSync(MODEL_DIR);
models.forEach(function (r) {
  if (r.endsWith('.js')) {
    var filepath = MODEL_DIR + '/' + r;
    var model = require(filepath);
    if (model.setup) {
      model.setup();
    }
  }
});

// Setup logging middleware
app.use(function (req, res, next) {
  console.log('[ ' + req.method + ' ]', req.url, req.query, req.body);
  next();
});

// Setup custom routes
var ROUTE_DIR = './routes';
var customRoutes = fs.readdirSync(ROUTE_DIR);
customRoutes.forEach(function (r) {
  if (r.endsWith('.js')) {
    var filepath = ROUTE_DIR + '/' + r;
    var routename = '/' + (r.startsWith('index') ? '' : r.split('.js')[0]);
    app.use(routename, require(filepath).router);
  }
});

// Setup server side react router
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var reactRoutes = require('./app/routes').default();

app.use(function (req, res) {
  Router.match({ routes: reactRoutes, location: req.url }, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(301).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      res.status(404).send('Not found');
    } else {
      var html = ReactDOM.renderToString(React.createElement(RoutingContext, renderProps));
      res.render('index', { html: html });
    }
  });
});

var server = app.listen(PORT, function () {
  console.log('Server running as [%s] on port [%s]', ENV, PORT);
});
