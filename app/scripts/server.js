'use strict';

import fs      from 'fs';
import express from 'express';
import React   from 'react';
import Router  from 'react-router';
import routes  from './routes';

let app = express();
app.use(express.static(__dirname + '/static'));

app.get('/scripts/bundle.js', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(fs.readFileSync(__dirname + '/bundle.js'));
});

app.use((req, res) => {
  Router.run(routes, req.path, (Handler) => {
    res.send(React.renderToString(<Handler path="{req.path}" />));
  });
});

//
// APIs
//

// Union traditional
app.get('/api/desert_union/:year/:month', require('./modules/api/desert_union'));
app.get('/api/forest_union/:year/:month', require('./modules/api/forest_union'));
app.get('/api/u_box/:year/:month',        require('./modules/api/u_box'));
app.get('/api/union_base/:year/:month',   require('./modules/api/union_base'));

app.get('/api/battlecity/:year/:month',   require('./modules/api/battlecity'));

// Asobiba
app.get('/api/asobiba_itabashi_1f/:year/:month', require('./modules/api/asobiba_itabashi_1f'));
app.get('/api/asobiba_itabashi_b1/:year/:month', require('./modules/api/asobiba_itabashi_b1'));
app.get('/api/asobiba_yokohama/:year/:month', require('./modules/api/asobiba_yokohama'));
app.get('/api/asobiba_akiba/:year/:month', require('./modules/api/asobiba_akiba'));

app.get('/api/cimax/:year/:month', require('./modules/api/cimax'));

app.get('/api/raid/:year/:month', require('./modules/api/raid'));

app.get('/api/no9/:year/:month', require('./modules/api/no9'));

app.get('/api/tokku/:year/:month', require('./modules/api/tokku'));

app.get('/api/village2/:year/:month', require('./modules/api/village2'));

// Google Calendar
app.get('/api/donpachi',     require('./modules/api/donpachi'));
app.get('/api/rockhill',     require('./modules/api/rockhill'));
app.get('/api/qoolong',      require('./modules/api/qoolong'));
app.get('/api/whitebase',    require('./modules/api/whitebase'));
app.get('/api/trigger_talk', require('./modules/api/trigger_talk'));
app.get('/api/code7', require('./modules/api/code7'));
app.get('/api/estate', require('./modules/api/estate'));
app.get('/api/infini', require('./modules/api/infini'));

app.listen(3000);
console.log('SavageScraper started on port 3000');

