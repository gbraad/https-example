'use strict';

// get port from environment settings for deployment on Heroku
var EXPRESS_PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var EXPRESS_SECURE = process.env.SECURE_PORT || 8443;
var EXPRESS_IPADDR = process.env.OPENSHIFT_NODEJS_IP || process.env.IPADDR || '127.0.0.1';
var EXPRESS_ROOT = __dirname;


function startExpress(root, port, secure, ipaddr) {
  var express = require('express');
  var https = require('https');
  var http = require('http');
  var fs = require('fs');

  var app = express();

  var options = {
    "key": fs.readFileSync('keys/key.pem'),
    "cert": fs.readFileSync('keys/cert.pem')
  };

  app.use(express.static(root));
  http.createServer(app).listen(port, ipaddr, function() {
    console.log('Listening on http://%s:%d/', ipaddr, port);
  });
  https.createServer(options, app).listen(secure, ipaddr, function() {
    console.log('Listening on https://%s:%d/', ipaddr, secure);
  });
}

startExpress(EXPRESS_ROOT, EXPRESS_PORT, EXPRESS_SECURE, EXPRESS_IPADDR);
