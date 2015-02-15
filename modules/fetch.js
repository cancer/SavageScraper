'use strict';
var client = require('./_lib').client;

module.exports = function(url, opts){
  client.fetch(url, opts);
};

