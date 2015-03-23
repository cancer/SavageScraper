'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('shinigami_rider@yahoo.co.jp').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

