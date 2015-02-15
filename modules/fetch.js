'use strict';
var client = require('./_lib').client;

module.exports = function(url, opts){
  return new Promise(function(resolve, reject){
    client.fetch(url, opts, function(err, $, res){
      if(err){
        reject(err);
      }
      resolve($, res);
    });
  });
};

