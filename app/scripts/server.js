'use strict';

var express = require('express');
var app = module.exports =  express();
app.use(express.static(__dirname + '/htdocs/static'));

//
// APIs
//

// Union traditional
app.get('/desert_union/:year/:month', require('./modules/api/desert_union'));
app.get('/forest_union/:year/:month', require('./modules/api/forest_union'));
app.get('/u_box/:year/:month',        require('./modules/api/u_box'));
app.get('/union_base/:year/:month',   require('./modules/api/union_base'));

app.get('/battlecity/:year/:month',   require('./modules/api/battlecity'));

// Asobiba
app.get('/asobiba_itabashi_1f/:year/:month', require('./modules/api/asobiba_itabashi_1f'));
app.get('/asobiba_itabashi_b1/:year/:month', require('./modules/api/asobiba_itabashi_b1'));
app.get('/asobiba_yokohama/:year/:month', require('./modules/api/asobiba_yokohama'));
app.get('/asobiba_akiba/:year/:month', require('./modules/api/asobiba_akiba'));

app.get('/cimax/:year/:month', require('./modules/api/cimax'));

app.get('/raid/:year/:month', require('./modules/api/raid'));

app.get('/no9/:year/:month', require('./modules/api/no9'));

app.get('/tokku/:year/:month', require('./modules/api/tokku'));

app.get('/village2/:year/:month', require('./modules/api/village2'));

// Google Calendar
app.get('/donpachi',     require('./modules/api/donpachi'));
app.get('/rockhill',     require('./modules/api/rockhill'));
app.get('/qoolong',      require('./modules/api/qoolong'));
app.get('/whitebase',    require('./modules/api/whitebase'));
app.get('/trigger_talk', require('./modules/api/trigger_talk'));
app.get('/code7', require('./modules/api/code7'));
app.get('/estate', require('./modules/api/estate'));
app.get('/infini', require('./modules/api/infini'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

