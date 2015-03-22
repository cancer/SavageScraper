'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('r0ol8sd96ifa8pe537aurjph60@group.calendar.google.com').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

