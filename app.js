'use strict';

var express = require('express');
var app = module.exports =  express();
app.use(express.static(__dirname + '/static'));

var sites = {
  forestUnion: require('./modules/forest-union')
};

app.get('/forest-union', require('./modules/forest-union'));
app.get('/donpachi', require('./modules/donpachi'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

