'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('bigmekadogg@gmail.com').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

