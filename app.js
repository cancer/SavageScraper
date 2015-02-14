'use strict';

var express = require('express');
var app = module.exports =  express();

var sites = {
  forestUnion: require('./modules/forest-union')
};

app.get('/', function(req, res){
  res.send('Welcome to SavageScraper!!');
});

app.get('/forest-union', require('./modules/forest-union'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

