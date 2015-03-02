'use strict';

var express = require('express');
var timeout = require('connect-timeout');

var app = module.exports =  express();
//app.use(timeout('10s'));
app.use((req, res, next) => {
  if(!req.timedout) next();
});
app.use(express.static(__dirname + '/static'));
var port = process.env.port || 3000;

// Union traditional
app.get('/desert_union/:year/:month', require('./modules/api/desert_union'));
app.get('/forest_union/:year/:month', require('./modules/api/forest_union'));
app.get('/u_box/:year/:month',        require('./modules/api/u_box'));
app.get('/union_base/:year/:month',   require('./modules/api/union_base'));

// Union newcomers
app.get('/battlecity/:year/:month',   require('./modules/api/battlecity'));

// Asobiba
app.get('/asobiba_itabashi_1f/:year/:month', require('./modules/api/asobiba_itabashi_1f'));
app.get('/asobiba_itabashi_b1/:year/:month', require('./modules/api/asobiba_itabashi_b1'));
app.get('/asobiba_yokohama/:year/:month', require('./modules/api/asobiba_yokohama'));
app.get('/asobiba_akiba/:year/:month', require('./modules/api/asobiba_akiba'));

// CIMAX
app.get('/cimax/:year/:month', require('./modules/api/cimax'));

// Google Calendar
app.get('/donpachi',     require('./modules/api/donpachi'));
app.get('/rockhill',     require('./modules/api/rockhill'));
app.get('/qoolong',      require('./modules/api/qoolong'));
app.get('/whitebase',    require('./modules/api/whitebase'));
app.get('/trigger_talk', require('./modules/api/trigger_talk'));

app.listen(port);
console.log("SavageScraper started on port " + port);

