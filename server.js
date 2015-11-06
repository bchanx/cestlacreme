'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react']
});

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
  min: ENV === 'production' ? '/min' : ''
};

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes').default();

app.use(function (req, res) {
  Router.match({ routes: routes, location: req.url }, function (err, redirectLocation, renderProps) {
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