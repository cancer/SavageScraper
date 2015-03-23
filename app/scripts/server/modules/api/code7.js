'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('gbgur5cb75sfi445iokpnl55j8@group.calendar.google.com').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

