'use strict';

var express = require('express');
var app = module.exports =  express();
app.use(express.static(__dirname + '/static'));

// Union traditional
app.get('/desert_union/:year/:month', require('./modules/api/desert_union'));
app.get('/forest_union/:year/:month', require('./modules/api/forest_union'));
app.get('/u_box/:year/:month',        require('./modules/api/u_box'));
app.get('/union_base/:year/:month',   require('./modules/api/union_base'));

app.get('/battlecity/:year/:month',   require('./modules/api/battlecity'));

// Google Calendar
app.get('/donpachi',     require('./modules/api/donpachi'));
app.get('/rockhill',     require('./modules/api/rockhill'));
app.get('/qoolong',      require('./modules/api/qoolong'));
app.get('/whitebase',    require('./modules/api/whitebase'));
app.get('/trigger_talk', require('./modules/api/trigger_talk'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

