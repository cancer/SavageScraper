'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('https://www.google.com/calendar/feeds/whitebase.sgf@gmail.com/public/basic?alt=json').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

