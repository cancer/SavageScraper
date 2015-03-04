'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('https://www.google.com/calendar/feeds/r0ol8sd96ifa8pe537aurjph60@group.calendar.google.com/public/basic?alt=json').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

