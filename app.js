'use strict';

var express = require('express');
var app = module.exports =  express();
app.use(express.static(__dirname + '/static'));

// Union traditional
app.get('/forest_union', require('./modules/api/forest_union'));

// Google Calendar
app.get('/donpachi',     require('./modules/api/donpachi'));
app.get('/rockhill',     require('./modules/api/rockhill'));
app.get('/qoolong',      require('./modules/api/qoolong'));
app.get('/whitebase',    require('./modules/api/whitebase'));
app.get('/trigger_talk', require('./modules/api/trigger_talk'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

